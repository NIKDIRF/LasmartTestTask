var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Отрисовщик
 */
export class Drawer {
    /**
     * Конструктор класса
     * @param container id DOM елемента
     * @param size размер DOM елемента сцены
     * @param httpClient
     */
    constructor(container, size, httpClient) {
        this.stage = new Konva.Stage({
            container: container,
            width: size.width,
            height: size.height
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        this.httpClient = httpClient;
        //Создание точки по клику с зажатым ctrl
        this.stage.on('click', (event) => __awaiter(this, void 0, void 0, function* () {
            if (event.evt.ctrlKey) {
                let $color = document.getElementById("color");
                let $radius = document.getElementById("radius");
                if (isNaN(Number($radius.value)) || Number($radius.value) <= 0 || Number($radius.value) > 50) {
                    window.alert("Разрешенный диапазон радиуса от 1 до 50");
                    return;
                }
                let newPoint = {
                    color: $color.value,
                    x: event.evt.clientX,
                    y: event.evt.clientY,
                    radius: Number($radius.value),
                    id: undefined,
                    comments: []
                };
                let result = yield httpClient.fetch("post", "point/addPoint", JSON.stringify(newPoint));
                this.layer.add(this.generatePoint(result));
            }
        }));
    }
    /**
     * Генерация точки
     * @param point данные точки из БД
     * @param newComment
     * @param newPosition
     * @returns group сгруппированные точка и комментарии
     */
    generatePoint(point, newComment, newPosition) {
        let group = new Konva.Group();
        let circle = new Konva.Circle({
            name: "point",
            id: point.id,
            radius: point.radius,
            x: point.x,
            y: point.y,
            fill: point.color
        });
        group.add(circle);
        let position = {
            x: point.x,
            y: point.y + point.radius
        };
        let label;
        point.comments.forEach(comment => {
            position.y += 25;
            label = this.generateComment(comment, position);
            group.add(label);
        });
        if (!!newComment) {
            label = this.generateComment(newComment, newPosition);
        }
        circle.on('dblclick', (evt) => __awaiter(this, void 0, void 0, function* () {
            yield this.deleteHandler(evt, group);
        }));
        group.on('click', (evt) => __awaiter(this, void 0, void 0, function* () {
            yield this.selectGroupHandler(evt, group);
        }));
        return group;
    }
    /**
     * Генерация комментария
     * @param comment данные комментария из БД
     * @param position позиция комметария для отрисовки
     * @private
     */
    generateComment(comment, position) {
        let label = new Konva.Label({
            name: "comment_label",
            y: position.y,
        });
        let tag = new Konva.Tag({
            name: "comment_tag",
            fill: comment.backgroundColor,
            stroke: "#7A7777",
            strokeWidth: 1
        });
        let text = new Konva.Text({
            name: "comment_text",
            text: " " + comment.text + " ",
            fontFamily: "Calibri",
            fontSize: 20,
            fill: "#6FA96D"
        });
        label.x(position.x - text.getWidth() / 2);
        label.add(tag, text);
        return label;
    }
    /**
     * Обработчик удаления точки
     * @param evt евент нажатия мыши
     * @param group группа состоящяя из круга и лэйблов
     * @private
     */
    deleteHandler(evt, group) {
        return __awaiter(this, void 0, void 0, function* () {
            let [foundPoint] = group.getChildren(ch => ch.name() == "point");
            if (!!foundPoint) {
                let id = parseInt(foundPoint.id());
                if (!isNaN(id)) {
                    try {
                        let result = yield this.httpClient.fetch("delete", "point/deletepoint?id=" + id);
                        if (result == false) {
                            window.alert('Точка не найдена в базе!');
                            return;
                        }
                    }
                    catch (ex) {
                        window.alert('Точка не удалена из базы!');
                    }
                }
                group.destroy();
                this.layer.batchDraw();
            }
        });
    }
    ;
    /**
     * Обработчик выбора группы
     * @param evt евент нажатия мыши
     * @param group группа состоящяя из круга и лэйблов
     * @private
     */
    selectGroupHandler(evt, group) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!this.currentGroup) {
                this.currentGroup.getChildren().forEach((ch) => {
                    if (!!ch.stroke && !!ch.strokeWidth) {
                        ch.stroke(null);
                        ch.strokeWidth(0);
                    }
                });
            }
            this.currentGroup = group;
            group.getChildren().forEach((ch) => {
                if (!!ch.stroke && !!ch.strokeWidth) {
                    ch.stroke('red');
                    ch.strokeWidth(3);
                }
            });
        });
    }
    ;
}
