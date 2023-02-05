// import Konva from 'konva';
import {Comment, HttpClient, Point} from "./HttpClient";
import {json} from "stream/consumers";

/**
 * Отрисовщик
 */
export class Drawer {

    /**
     * Сцена
     * @private
     */
    public stage: Konva.Stage;
    /**
     * Основной слой отрисовки
     * @private
     */
    public layer: Konva.Layer;

    private httpClient: HttpClient;

    public currentGroup: Konva.Group;

    /**
     * Конструктор класса
     * @param container id DOM елемента
     * @param size размер DOM елемента сцены
     * @param httpClient
     */
    constructor(container: string, size: { width: number, height: number }, httpClient: HttpClient) {

        this.stage = new Konva.Stage({
            container: container,
            width: size.width,
            height: size.height
        });

        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        this.httpClient = httpClient;

        //Создание точки по клику с зажатым ctrl
        this.stage.on('click', async event => {
            if (event.evt.ctrlKey) {

                let $color = document.getElementById("color") as HTMLInputElement
                let $radius = document.getElementById("radius") as HTMLInputElement
                if (isNaN(Number($radius.value)) || Number($radius.value) <= 0 || Number($radius.value) > 50) {
                    window.alert("Разрешенный диапазон радиуса от 1 до 50");
                    return;
                }
                let newPoint: Point = {
                    color: $color.value,
                    x: event.evt.clientX,
                    y: event.evt.clientY,
                    radius: Number($radius.value),
                    id: undefined,
                    comments: []
                }
                let result: Point = await httpClient.fetch("post", "point/addPoint", JSON.stringify(newPoint))
                this.layer.add(this.generatePoint(result))
            }
        })
    }

    /**
     * Генерация точки
     * @param point данные точки из БД
     * @param newComment
     * @param newPosition
     * @returns group сгруппированные точка и комментарии
     */
    public generatePoint(point: Point, newComment?: Comment, newPosition?: Konva.Vector2d): Konva.Group {
        let group = new Konva.Group();

        let circle = new Konva.Circle({
            name: "point",
            id: point.id,
            radius: point.radius,
            x: point.x,
            y: point.y,
            fill: point.color
        });
        group.add(circle)

        let position: Konva.Vector2d = {
            x: point.x,
            y: point.y + point.radius
        }
        let label: Konva.Label
        point.comments.forEach(comment => {

            position.y += 25
            label = this.generateComment(comment, position)
            group.add(label)
        });

        if (!!newComment) {
            label = this.generateComment(newComment, newPosition)
        }


        circle.on('dblclick', async evt => {
            await this.deleteHandler(evt, group);
        });

        group.on('click', async evt => {
            await this.selectGroupHandler(evt, group);
        });
        return group;
    }

    /**
     * Генерация комментария
     * @param comment данные комментария из БД
     * @param position позиция комметария для отрисовки
     * @private
     */
    public generateComment(comment: Comment, position: Konva.Vector2d): Konva.Label {
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
        })

        label.x(position.x - text.getWidth() / 2)
        label.add(tag, text)
        return label
    }

    /**
     * Обработчик удаления точки
     * @param evt евент нажатия мыши
     * @param group группа состоящяя из круга и лэйблов
     * @private
     */
    private async deleteHandler(evt: Konva.KonvaEventObject<MouseEvent>, group: Konva.Group): Promise<void> {
        let [foundPoint] = group.getChildren(ch => ch.name=="point");
        if (!!foundPoint) {
            let id = parseInt(foundPoint.id());
            if (!isNaN(id)) {
                try {
                    let result = await this.httpClient.fetch("delete", "point/deletepoint?id=" + id)
                    if (result == false) {
                        window.alert('Точка не найдена в базе!')
                        return
                    }
                } catch (ex) {
                    window.alert('Точка не удалена из базы!')
                }
            }
            group.destroy();
            this.layer.batchDraw();
        }
    };

    /**
     * Обработчик выбора группы
     * @param evt евент нажатия мыши
     * @param group группа состоящяя из круга и лэйблов
     * @private
     */
    private async selectGroupHandler(evt: Konva.KonvaEventObject<MouseEvent>, group: Konva.Group): Promise<void> {
        if (!!this.currentGroup) {
            this.currentGroup.getChildren().forEach((ch: Konva.Shape) => {
                if (!!ch.stroke && !!ch.strokeWidth) {
                    ch.stroke(null);
                    ch.strokeWidth(0);
                }
            })
        }
        this.currentGroup = group;
        group.getChildren().forEach((ch: Konva.Shape) => {
            if (!!ch.stroke && !!ch.strokeWidth) {
                ch.stroke('red');
                ch.strokeWidth(3);
            }
        })
    }
    ;
}
