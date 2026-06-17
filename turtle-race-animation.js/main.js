// Datos de la tortuga
var bodyX = 80;
var bodyY = 305;
var bodyW = 118;
var faceW = bodyW / 2;
var bodyH = 60;
var faceH = bodyH / 2;

var capX = bodyX - 10;
var capY = bodyY;
var capW = bodyW - 60;
var capH = bodyH - 30;

// Datos de la liebre
var hxPos = 300;
var hyPos = 290;
var hSize = 70;
var eyeSize = 8;
var eyeGrow = true;

// Estrellitas para cuando se haga de noche
var estrellas = [];

function setup() {
    createCanvas(400, 400);

    for (var i = 0; i < 100; i++) {
        estrellas.push({
            x: random(10, width - 10),
            y: random(10, 240),
            tam: random(1.5, 3.5)
        });
    }
}

function draw() {
    // Este progreso depende de la tortuga, asi va cambiando el dia a noche.
    var progreso = map(bodyX, 10, 364, 0, 1);
    var r = lerp(0, 10, progreso);
    var g = lerp(196, 20, progreso);
    var b = lerp(255, 60, progreso);
    background(r, g, b);

    // ---------------- Cielo ----------------

    var centroX = 200;
    var solY = lerp(120, -70, progreso);
    var lunaY = lerp(-70, 120, progreso);

    // Las nubes se separan y poco a poco desaparecen.
    var nubeAlpha = map(progreso, 0, 0.55, 255, 0);
    var nubeIzqX = lerp(centroX - 30, -60, progreso);
    var nubeDerX = lerp(centroX + 30, 460, progreso);
    var nubeY = lerp(130, 160, progreso);

    noStroke();

    // Nube izquierda
    fill(210, 230, 255, nubeAlpha);
    ellipse(nubeIzqX, nubeY, 80, 40);
    ellipse(nubeIzqX - 25, nubeY + 10, 55, 32);
    ellipse(nubeIzqX + 28, nubeY + 8, 55, 32);
    ellipse(nubeIzqX - 10, nubeY - 14, 50, 30);

    // Nube derecha
    fill(210, 230, 255, nubeAlpha);
    ellipse(nubeDerX, nubeY, 75, 38);
    ellipse(nubeDerX - 26, nubeY + 10, 52, 30);
    ellipse(nubeDerX + 22, nubeY + 8, 50, 30);
    ellipse(nubeDerX + 5, nubeY - 12, 46, 28);

    // Sol con rayitos.
    var solAlpha = map(progreso, 0.4, 0.6, 255, 0);
    stroke(255, 200, 0, solAlpha);
    strokeWeight(2);
    for (var ang = 0; ang < 360; ang += 30) {
        var rx1 = centroX + cos(radians(ang)) * 30;
        var ry1 = solY + sin(radians(ang)) * 30;
        var rx2 = centroX + cos(radians(ang)) * 46;
        var ry2 = solY + sin(radians(ang)) * 46;
        line(rx1, ry1, rx2, ry2);
    }

    noStroke();
    fill(255, 200, 0, solAlpha);
    ellipse(centroX, solY, 52, 52);
    fill(255, 230, 80, solAlpha);
    ellipse(centroX, solY, 36, 36);

    // Luna.
    fill(255, 255, 200);
    ellipse(centroX, lunaY, 46, 46);
    fill(r, g, b);
    ellipse(centroX + 12, lunaY - 5, 42, 42);

    // Estrellas, aparecen cuando ya va avanzando la noche.
    if (progreso > 0.35) {
        var alpha = map(progreso, 0.35, 0.75, 0, 255);
        alpha = constrain(alpha, 0, 255);
        fill(255, 255, 255, alpha);
        noStroke();
        for (var i = 0; i < estrellas.length; i++) {
            ellipse(estrellas[i].x, estrellas[i].y, estrellas[i].tam, estrellas[i].tam);
        }
    }

    // ---------------- Suelo y fondo ----------------

    push();
    noStroke();

    // Piso y camino.
    fill(29, 163, 41);
    rect(1, 299, 400, 152);
    fill(107, 100, 3);
    rect(1, 306, 400, 55);

    // Pinos del fondo.
    fill(101, 60, 20);
    rect(18, 285, 7, 18);
    fill(34, 100, 20);
    triangle(4, 285, 21, 255, 38, 285);
    fill(40, 120, 24);
    triangle(7, 272, 21, 245, 35, 272);
    fill(50, 140, 28);
    triangle(10, 260, 21, 235, 32, 260);

    fill(101, 60, 20);
    rect(48, 285, 7, 18);
    fill(34, 100, 20);
    triangle(34, 285, 51, 255, 68, 285);
    fill(40, 120, 24);
    triangle(37, 272, 51, 245, 65, 272);
    fill(50, 140, 28);
    triangle(40, 260, 51, 235, 62, 260);

    fill(101, 60, 20);
    rect(113, 288, 5, 14);
    fill(34, 100, 20);
    triangle(102, 288, 115, 264, 128, 288);
    fill(40, 120, 24);
    triangle(104, 277, 115, 256, 126, 277);
    fill(50, 140, 28);
    triangle(107, 268, 115, 248, 123, 268);

    fill(101, 60, 20);
    rect(343, 288, 5, 14);
    fill(34, 100, 20);
    triangle(332, 288, 345, 264, 358, 288);
    fill(40, 120, 24);
    triangle(334, 277, 345, 256, 356, 277);
    fill(50, 140, 28);
    triangle(337, 268, 345, 248, 353, 268);

    fill(101, 60, 20);
    rect(373, 285, 7, 18);
    fill(34, 100, 20);
    triangle(359, 285, 376, 255, 393, 285);
    fill(40, 120, 24);
    triangle(362, 272, 376, 245, 390, 272);
    fill(50, 140, 28);
    triangle(365, 260, 376, 235, 387, 260);

    // ---------------- Liebre ----------------

    // Cuerpo y cabeza.
    fill(210, 185, 150);
    ellipse(hxPos, hyPos + 18, hSize * 0.7, hSize * 0.55);
    ellipse(hxPos, hyPos - 8, hSize * 0.52, hSize * 0.48);

    // Orejas.
    fill(210, 185, 150);
    ellipse(hxPos - 13, hyPos - 35, hSize * 0.2, hSize * 0.6);
    ellipse(hxPos + 13, hyPos - 35, hSize * 0.2, hSize * 0.6);
    fill(210, 140, 140);
    ellipse(hxPos - 13, hyPos - 35, hSize * 0.1, hSize * 0.46);
    ellipse(hxPos + 13, hyPos - 35, hSize * 0.1, hSize * 0.46);

    // Carita.
    fill(240, 180, 180);
    ellipse(hxPos - 13, hyPos + 2, hSize * 0.18, hSize * 0.12);
    ellipse(hxPos + 13, hyPos + 2, hSize * 0.18, hSize * 0.12);
    fill(200, 100, 120);
    ellipse(hxPos, hyPos + 5, hSize * 0.1, hSize * 0.07);

    // Bigotes.
    stroke(120);
    strokeWeight(0.8);
    line(hxPos - 4, hyPos + 6, hxPos - 22, hyPos + 1);
    line(hxPos - 4, hyPos + 9, hxPos - 22, hyPos + 9);
    line(hxPos + 4, hyPos + 6, hxPos + 22, hyPos + 1);
    line(hxPos + 4, hyPos + 9, hxPos + 22, hyPos + 9);

    // Ojo izquierdo, este es el que crece.
    noStroke();
    fill(255);
    ellipse(hxPos - 10, hyPos - 9, eyeSize, eyeSize);
    fill(50, 80, 200);
    ellipse(hxPos - 9, hyPos - 10, eyeSize * 0.55, eyeSize * 0.55);
    fill(0);
    ellipse(hxPos - 8, hyPos - 11, eyeSize * 0.28, eyeSize * 0.28);

    // Ojo derecho normal.
    fill(255);
    ellipse(hxPos + 10, hyPos - 9, 8, 8);
    fill(50, 80, 200);
    ellipse(hxPos + 11, hyPos - 10, 5, 5);
    fill(0);
    ellipse(hxPos + 12, hyPos - 11, 2.5, 2.5);

    // Colita y las zzz porque esta dormida.
    fill(255);
    ellipse(hxPos - 25, hyPos + 20, 10, 10);
    fill(245, 245, 255);
    textSize(14);
    textStyle(BOLD);
    text("z", hxPos + 28, hyPos - 48 + sin(frameCount * 0.05) * 2);
    text("z", hxPos + 42, hyPos - 60 + sin(frameCount * 0.05 + 1) * 2);
    text("z", hxPos + 56, hyPos - 72 + sin(frameCount * 0.05 + 2) * 2);
    text("z", hxPos + 70, hyPos - 84 + sin(frameCount * 0.05 + 3) * 2);
    textStyle(NORMAL);

    // ---------------- Tortuga ----------------

    // Sombra, patas, cuerpo y cola.
    fill(51, 51, 51);
    ellipse(bodyX - 10, bodyY + 35, bodyW + 20, bodyH - 30);
    fill(24, 201, 36);
    ellipse(capX - 40, capY + 20, capW - 40, capH - 10);
    ellipse(capX + 40, capY + 20, capW - 40, capH - 10);
    fill(11, 140, 58);
    ellipse(bodyX - 10, bodyY, bodyW, bodyH);
    fill(4, 196, 20);
    ellipse(capX - 60, capY, capW - 40, capH - 40);
    pop();

    push();
    noStroke();
    fill(4, 196, 20);
    ellipse(bodyX + 50, bodyY - 10, faceW - 30, faceH);
    ellipse(capX, capY, capW, capH);
    fill(23, 11, 11);
    pop();

    // Lineas del caparazon.
    push();
    stroke(4, 196, 20);
    line(capX - capW / 1, capY, capX + capW / 1, capY);
    stroke(4, 196, 20);
    line(capX, capY - capH / 1, capX, capY + capH / 1);
    pop();

    // Ojo de la tortuga.
    push();
    noStroke();
    fill(255, 255, 255);
    ellipse(bodyX + 55, bodyY - 15, faceW - 50, faceH - 20);
    fill(0, 0, 0);
    ellipse(bodyX + 56, bodyY - 15, faceW - 55, faceH - 26);
    pop();

    // ---------------- Detalles del camino ----------------

    // Flores.
    push();
    translate(27, 369);
    fill(255);
    for (var i = 0; i < 12; i++) {
        ellipse(11, 0, 10, 4);
        rotate(radians(30));
    }
    fill(255, 225, 0);
    ellipse(0, 0, 10, 10);
    pop();

    push();
    translate(56, 382);
    fill(255);
    for (var i = 0; i < 12; i++) {
        ellipse(11, 0, 10, 4);
        rotate(radians(30));
    }
    fill(255, 225, 0);
    ellipse(0, 0, 10, 10);
    pop();

    push();
    translate(86, 369);
    fill(255);
    for (var i = 0; i < 12; i++) {
        ellipse(10, 0, 10, 4);
        rotate(radians(30));
    }
    fill(255, 225, 0);
    ellipse(0, 0, 9, 9);
    pop();

    push();
    translate(289, 382);
    fill(255);
    for (var i = 0; i < 12; i++) {
        ellipse(11, 0, 10, 4);
        rotate(radians(30));
    }
    fill(255, 225, 0);
    ellipse(0, 0, 10, 10);
    pop();

    push();
    translate(324, 365);
    fill(255);
    for (var i = 0; i < 12; i++) {
        ellipse(11, 0, 10, 4);
        rotate(radians(30));
    }
    fill(255, 225, 0);
    ellipse(0, 0, 10, 10);
    pop();

    push();
    translate(355, 385);
    fill(255);
    for (var i = 0; i < 12; i++) {
        ellipse(10, 0, 10, 4);
        rotate(radians(30));
    }
    fill(255, 225, 0);
    ellipse(0, 0, 9, 9);
    pop();

    // Popo con carita.
    fill(158, 101, 41);
    ellipse(250, 390, 42, 16);
    ellipse(250, 381, 30, 16);
    ellipse(250, 371, 19, 16);
    fill(0, 0, 0);
    ellipse(247, 378, 7, 11);
    ellipse(256, 378, 7, 11);
    fill(255, 255, 255);
    arc(251, 385, 22, 20, radians(1), radians(180));

    // Tronco.
    var xtri = 127;
    var ytri = 380;
    var xtri2 = 128;
    var ytri2 = 370;
    var xtri3 = 140;
    var ytri3 = 375;
    var xtri4 = 138;
    var ytri4 = 387;
    var xtri5 = 210;
    var ytri5 = 371;
    var xtri6 = 210;
    var ytri6 = 386;

    fill(46, 217, 24);
    ellipse(169, 395, 104, 14);
    fill(29, 82, 15);
    ellipse(169, 395, 87, 10);
    fill(163, 120, 0);
    rect(135, 360, 75, 37, 8);

    push();
    fill(97, 85, 18);
    ellipse(135, 378, 13, 40);
    fill(158, 111, 76);
    ellipse(135, 378, 5, 30);
    fill(74, 65, 0);
    ellipse(135, 378, 2, 12);
    pop();

    noStroke();
    fill(88, 207, 2);
    triangle(xtri, ytri, xtri + 5, ytri, xtri, ytri - 3);
    triangle(xtri2, ytri2 + 1, xtri2 + 4, ytri2 + 2, xtri2, ytri2 - 2);
    fill(105, 78, 8);
    triangle(xtri3, ytri3 + 1, xtri3 + 4, ytri3 + 0, xtri3, ytri3 - 2);
    triangle(xtri4, ytri4 + 1, xtri4 + 12, ytri4 + 0, xtri4, ytri4 - 2);
    triangle(xtri5, ytri5 + 1, xtri5 - 12, ytri5 + 3, xtri5, ytri5 - 2);
    triangle(xtri6, ytri6 + 1, xtri6 - 10, ytri6 + 3, xtri6, ytri6 - 2);

    stroke(92, 68, 17);
    line(197, 364, 155, 364);
    line(171, 383, 154, 383);
    line(193, 374, 154, 375);
    line(195, 393, 154, 393);
    line(167, 389, 154, 389);

    // Hongo.
    noStroke();
    fill(255, 0, 0);
    ellipse(149, 365, 19, 8);
    fill(255, 0, 230);
    ellipse(149, 365, 15, 4);
    fill(255, 255, 255);
    rect(146, 365, 6, 7, 4);

    // Meta.
    fill(255);
    rect(364, 315, 30, 46);
    fill(255, 0, 0);
    rect(375, 331, 10, 30);
    stroke(0, 0, 0);
    line(379, 245, 380, 322);
    fill(255, 0, 0);
    triangle(397, 265, 380, 292, 377, 235);

    // ---------------- Movimiento ----------------

    // Al mantener presionado el mouse, la tortuga avanza.
    if (mouseIsPressed) {
        bodyX = bodyX + 0.2;
        capX = capX + 0.2;
        fill(255, 0, 0);
        ellipse(mouseX, mouseY, 10, 10);
    }

    // El ojo de la liebre crece y se achica.
    if (eyeGrow) {
        eyeSize += 0.15;
        if (eyeSize > 18) eyeGrow = false;
    } else {
        eyeSize -= 0.15;
        if (eyeSize < 8) eyeGrow = true;
    }
}
