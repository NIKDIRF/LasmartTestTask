import {Drawer} from "./Drawer.js";
import {Comment, HttpClient, Point} from "./HttpClient.js";

// import Konva from "konva";


const httpClient = new HttpClient("https://localhost:44382");

let drawer = new Drawer("stage", {
        width: window.innerWidth * 0.75,
        height: window.innerHeight * 0.98,
    },
    httpClient
)

httpClient.fetch('get', "point/GetAll")
    .then((points: Point[]) => {
        points.forEach(point => {
            drawer.layer.add(drawer.generatePoint(point));
        })
    });

let $button = document.getElementById("button") as HTMLButtonElement;
let $bgColor = document.getElementById("commentColor") as HTMLButtonElement;
let $text = document.getElementById("text") as HTMLButtonElement;

$button.addEventListener('click', async (evt) => {
    if (!drawer.currentGroup) {
        window.alert("Выберите точку для добавления комментария");
        return;
    }

    let [circle] = drawer.currentGroup.getChildren(ch => ch.name()=="point");
    let [lastComment] = drawer.currentGroup.getChildren(ch => ch.name()=="comment_label").sort((a,b) => b.y() - a.y())

    let comment: Comment = {
        backgroundColor: $bgColor.value,
        text: $text.value,
        pointId: circle.id()
    }
    let position = {
        x: circle.position().x,
        y: 25
    };
    if (!!lastComment) {
        position.y += lastComment.y()
    } else {
        position.y += circle.radius() + circle.position().y
    }

    await httpClient.fetch("post", "comment/AddComment", JSON.stringify(comment))
    drawer.currentGroup.add(drawer.generateComment(comment, position))
})

