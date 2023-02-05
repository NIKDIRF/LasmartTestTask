var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Drawer } from "./Drawer.js";
import { HttpClient } from "./HttpClient.js";
// import Konva from "konva";
const httpClient = new HttpClient("https://localhost:44382");
let drawer = new Drawer("stage", {
    width: window.innerWidth * 0.75,
    height: window.innerHeight * 0.98,
}, httpClient);
httpClient.fetch('get', "point/GetAll")
    .then((points) => {
    points.forEach(point => {
        drawer.layer.add(drawer.generatePoint(point));
    });
});
let $button = document.getElementById("button");
let $bgColor = document.getElementById("commentColor");
let $text = document.getElementById("text");
$button.addEventListener('click', (evt) => __awaiter(void 0, void 0, void 0, function* () {
    if (!drawer.currentGroup) {
        window.alert("Выберите точку для добавления комментария");
        return;
    }
    let pointID;
    drawer.currentGroup.getChildren().forEach(ch => {
        if (!!ch.name()) {
            pointID = parseInt(ch.name());
        }
    });
    let comment = {
        backgroundColor: $bgColor.value,
        text: $text.value,
        pointId: pointID
    };
    let last = drawer.currentGroup.getChildren().length - 1;
    let circle = drawer.currentGroup.getChildren()[0];
    let lastComment = drawer.currentGroup.getChildren()[last];
    let position = {
        x: circle.position().x,
        y: lastComment.position().y + 25
    };
    yield httpClient.fetch("post", "comment/AddComment", JSON.stringify(comment));
    drawer.currentGroup.add(drawer.generateComment(comment, position));
}));
