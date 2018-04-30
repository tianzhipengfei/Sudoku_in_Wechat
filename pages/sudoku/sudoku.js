//HPY: -1.note模式下出现双击填0的情况   -2.selectNum颜色不明显
//LJL: -1. sameNumHighlight(need to talk more)

// importScripts('../../sudokuModel.js');
import sudokuFile from '../../sudokuModel'

/*
For each cell
cat true means can fill the call, false not
note true means this cell is in note mode
content contains the number filled
color means the number's color: 0 means normal, 1 means ubchangable number, 2 means error, 3 means highlight in same number as user choose， 4 means unchangeable number error, 5 means note
*/
function cellModel() {
    this.cat = true;
    this.note = false;
    if (arguments[0]) {
        this.content = arguments[0];
    } else {
        this.content = '0';
    }
    this.color = 0;
}

class Sudoku {
    constructor() {
        this.ans = "";
        this.boardData =
            [
                [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
                [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
                [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
                [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
                [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
                [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
                [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
                [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
                [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
            ];
        this.row =
            [
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
            ];
        this.col =
            [
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
            ];
        this.zone =
            [
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
                [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
            ];
    }

    getData(x, y) {
        return this.boardData[x][y];
    }

    setData(x, y, num, note) {
        let tempNum = num
        //Judge can fill the cell or not
        if (this.boardData[x][y].cat == false) {
            this.freshProperty();
            return;
        } else {
            if (this.boardData[x][y].content != "0" && this.boardData[x][y].content == num.toString()) {
                num = 0;
            }
            //update record table
            if (this.boardData[x][y].note == false && this.boardData[x][y] != "0") {
                if (this.boardData[x][y].content != "0") {
                    this.row[x][parseInt(this.boardData[x][y].content) - 1].delete(x * 10 + y);
                    this.col[y][parseInt(this.boardData[x][y].content) - 1].delete(x * 10 + y);
                    this.zone[parseInt(parseInt(x / 3) * 3 + parseInt(y / 3))][parseInt(this.boardData[x][y].content) - 1].delete(x * 10 + y);
                }
            }
            if (note == false && num != 0) {
                this.row[x][num - 1].add(x * 10 + y);
                this.col[y][num - 1].add(x * 10 + y);
                this.zone[parseInt(parseInt(x / 3) * 3 + parseInt(y / 3))][num - 1].add(x * 10 + y);
            }
            //change data in cell
            this.boardData[x][y].note = note;
            if (this.boardData[x][y].content == "0") {
                this.boardData[x][y].content = num.toString();
            } else if (note == true) {
                if (this.boardData[x][y].content.indexOf(tempNum.toString()) == -1) {
                    //曲悦测试出的 bug, note 模式下按空的 table 后 board 内显示0
                    if (tempNum == 0) {
                        this.boardData[x][y].content = "0";
                    } else {
                        this.boardData[x][y].content += tempNum.toString();
                    }
                } else {
                    this.boardData[x][y].content = this.boardData[x][y].content.split(tempNum.toString()).join("");
                }
            } else {
                if (this.boardData[x][y].content == num.toString()) {
                    this.boardData[x][y].content = "0";
                } else {
                    this.boardData[x][y].content = num.toString();
                }
            }
            //this.freshProperty()
        }
    }

    highlightNum(num) {
        if (num == 0) {
            return
        }
        this.freshProperty();
        for (var i = 0; i < 9; i++) {
            if (this.row[i][num - 1].size > 0) {
                for (var tempNum of this.row[i][num - 1]) {
                    let tempRow = parseInt(tempNum / 10);
                    let tempCol = tempNum % 10;
                    if (this.boardData[tempRow][tempCol].color != 2 &&
                        this.boardData[tempRow][tempCol].color != 4) {
                        this.boardData[tempRow][tempCol].color = 3;
                    }
                }
            }
        }
    }

    freshProperty() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (this.boardData[i][j].cat == false) {
                    this.boardData[i][j].color = 1;
                } else {
                    if (this.boardData[i][j].note == true) {
                        this.boardData[i][j].color = 5;
                    } else {
                        this.boardData[i][j].color = 0;
                    }
                }
            }
        }
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (this.row[i][j].size > 1) {
                    for (var num of this.row[i][j]) {
                        let tempRow = parseInt(num / 10);
                        let tempCol = num % 10;
                        if (this.boardData[tempRow][tempCol].cat == true) {
                            this.boardData[tempRow][tempCol].color = 2;
                        } else {
                            this.boardData[tempRow][tempCol].color = 4;
                        }
                    }
                }
                if (this.col[i][j].size > 1) {
                    for (var num of this.col[i][j]) {
                        let tempRow = parseInt(num / 10);
                        let tempCol = num % 10;
                        if (this.boardData[tempRow][tempCol].cat == true) {
                            this.boardData[tempRow][tempCol].color = 2;
                        } else {
                            this.boardData[tempRow][tempCol].color = 4;
                        }
                    }
                }
                if (this.zone[i][j].size > 1) {
                    for (var num of this.zone[i][j]) {
                        let tempRow = parseInt(num / 10);
                        let tempCol = num % 10;
                        if (this.boardData[tempRow][tempCol].cat == true) {
                            this.boardData[tempRow][tempCol].color = 2;
                        } else {
                            this.boardData[tempRow][tempCol].color = 4;
                        }
                    }
                }
            }
        }
    }

    returnNum(i, j) {
        if (this.getData(i, j).content == "0") {
            return -1
        } else if (this.getData(i, j).content.length > 1) {
            return -1
        } else {
            return parseInt(this.getData(i, j).content) - 1
        }
    }

    freshDiagonal() {
        var coord1 = [-1, -1, -1, -1, -1, -1, -1, -1, -1]
        var coord2 = [-1, -1, -1, -1, -1, -1, -1, -1, -1]
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                var num = this.returnNum(i, j)
                if (i == j && num != -1 && coord1[num] == -1) {
                    coord1[num] = i * 10 + j
                    console.log(i + " " + j)
                } else if (i == j && num != -1 && coord1[num] != -1) {
                    if (this.boardData[parseInt(coord1[num] / 10)][coord1[num] % 10].cat == true) {
                        this.boardData[parseInt(coord1[num] / 10)][coord1[num] % 10].color = 2
                    } else {
                        this.boardData[parseInt(coord1[num] / 10)][coord1[num] % 10].color = 4
                    }
                    if (this.boardData[i][j].cat == true) {
                        this.boardData[i][j].color = 2
                    } else {
                        this.boardData[i][j].color = 4
                    }
                    coord1[num] = i * 10 + j;
                }

                if (i + j == 8 && num != -1 && coord2[num] == -1) {
                    coord2[num] = i * 10 + j;
                } else if (i + j == 8 && num != -1 && coord2[num] != -1) {
                    if (this.boardData[parseInt(coord2[num] / 10)][coord2[num] % 10].cat == true) {
                        this.boardData[parseInt(coord2[num] / 10)][coord2[num] % 10].color = 2
                    } else {
                        this.boardData[parseInt(coord2[num] / 10)][coord2[num] % 10].color = 4
                    }
                    if (this.boardData[i][j].cat == true) {
                        this.boardData[i][j].color = 2
                    } else {
                        this.boardData[i][j].color = 4
                    }
                    coord2[num] = i * 10 + j;
                }
            }
        }
    }

    setGame(gameData, gameAns) {
        var position = 0;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                position = i * 9 + j;
                if (gameData[position] != '0') {
                    this.boardData[i][j].cat = false;
                    this.boardData[i][j].note = false;
                    this.boardData[i][j].content = gameData[position];
                    this.boardData[i][j].color = 1;
                    this.row[i][parseInt(gameData[position]) - 1].add(i * 10 + j);
                    this.col[j][parseInt(gameData[position]) - 1].add(i * 10 + j);
                    this.zone[parseInt(parseInt(i / 3) * 3 + parseInt(j / 3))][parseInt(gameData[position]) - 1].add(i * 10 + j);
                }
            }
        }
        this.ans = gameAns;
    }

    show() {
        for (var i = 0; i < 9; i++) {
            var temp = ""
            for (var j = 0; j < 9; j++) {
                temp = temp + this.boardData[i][j].content + " ";
            }
            console.log(temp);
        }
    }

    reset() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                this.boardData[i][j].cat = true;
                this.boardData[i][j].note = false;
                this.boardData[i][j].content = "0";
                this.boardData[i][j].color = 0;
                this.row[i][j].clear();
                this.col[i][j].clear();
                this.zone[i][j].clear();
            }
        }
    }

    judgeCorrect() {
        var userAns = ""
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                userAns += this.boardData[i][j].content;
            }
        }
        console.log(userAns);
        console.log(this.ans);
        return userAns == this.ans;
    }

    freeze() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                this.boardData[i][j].car = false;
            }
        }
    }
}

//全局设置变量
let currentNote = false;
var sameNumHighlight = false;
var errorShow = false;
var timeShow = true;

let phoneWidth = wx.getSystemInfoSync().screenWidth;
let ratio = 750 / phoneWidth;
let boardWidthInPrx = 675;
let boardWidthInPx = boardWidthInPrx * phoneWidth / 750;
let tableWidthInPrx = 527;
let tableHeighInPrx = 213.5;
let tableWidthInPx = tableWidthInPrx * phoneWidth / 750;
let tableHeighInPx = tableHeighInPrx * phoneWidth / 750;
let lineWidth1 = 2;
let lineWidth2 = 1.5;
let cellWidth = (boardWidthInPrx - lineWidth1 * 4 - lineWidth2 * 6) / 9;
let tableWidth = (tableWidthInPrx - lineWidth1 * 6) / 5;
//Zixuan board 里各种情况下的颜色
let colorTable = ["gray", "black", "#CC6699", "#CC9900", "#CC0000", "#666666"]
let sudokuGameData1 = require('../../utils/data1.js')
let sudokuGameData2 = require('../../utils/data2.js')
let sudokuGameData3 = require('../../utils/data3.js')
let sudokuGameData4 = require('../../utils/data4.js')
let sudokuGameData5 = require('../../utils/data5.js')
let sudokuGameData6 = require('../../utils/data6.js')
let sudokuGameData7 = require('../../utils/data7.js')
let sudokuGameData8 = require('../../utils/data8.js')
let sudokuGameData9 = require('../../utils/data9.js')
let sudokuGameData10 = require('../../utils/data10.js')
let mutiDraw = require('../../pages/sudoku/draw.js')

var selectX = -1;
var selectY = -1;
var selectNum = -1;
var sudoku = new Sudoku();
var num = 0;
var strH = '';
var strM = '';
var strS = '';
var timer = '';
var level = 0;
var remainNum = 81;

Page({
<<<<<<< HEAD
    data: {
        generateOk: false,
        timeText: '00:00',
        timeShowOrNOt: true
    },

    onLoad(option) {
        console.log(option.level)
        level = parseInt(option.level);
        sameNumHighlight = getApp().globalData.highlightOrNot;
        errorShow = getApp().globalData.errorOrNot;
        timeShow = getApp().globalData.timeOrNot;
        console.log(timeShow)
        this.setData({
            timeShowOrNOt: timeShow
        });
        this.newGame();
    },

    newGame() {
        this.setData({
            generateOk: false
        })
        sudoku.reset();
=======
  data: {
    generateOk: false,
    timeText: '00:00',
    timeShowOrNOt: true
  },
  
  onReady() {
  },

  onLoad(option) {
    console.log(option.level)
    level = parseInt(option.level);
    sameNumHighlight = getApp().globalData.highlightOrNot;
    errorShow = getApp().globalData.errorOrNot;
    timeShow = getApp().globalData.timeOrNot;
    console.log(timeShow)
    this.setData({
      timeShowOrNOt: timeShow
    });
    this.newGame();
  },

  newGame() {
    this.setData({
      generateOk: false
    })
    sudoku.reset();
    this.timeStop();
    timer = '0';
    strH = '0';
    strM = '0';
    strS = '0';
    num = 0;
    this.setData({
      timeText: '00:00'
    })
    var gameID = Math.floor(Math.random() * 200) + level * 1000;
    if (gameID > 9868)
      gameID = 9868
    var newGameObject, newGameData, newGameAns;
    switch (level) {
      case 0:
        newGameObject = sudokuGameData1.searchSData(gameID);
        newGameData = newGameObject.data;
        newGameAns = newGameObject.ans;
        break;
      case 1:
        newGameObject = sudokuGameData2.searchSData(gameID);
        newGameData = newGameObject.data;
        newGameAns = newGameObject.ans;
        break;
      case 2:
        newGameObject = sudokuGameData3.searchSData(gameID);
        newGameData = newGameObject.data;
        newGameAns = newGameObject.ans;
        break;
      case 3:
        newGameObject = sudokuGameData4.searchSData(gameID);
        newGameData = newGameObject.data;
        newGameAns = newGameObject.ans;
        break;
      case 4:
        newGameObject = sudokuGameData5.searchSData(gameID);
        newGameData = newGameObject.data;
        newGameAns = newGameObject.ans;
        break;
      case 5:
        newGameObject = sudokuGameData6.searchSData(gameID);
        newGameData = newGameObject.data;
        newGameAns = newGameObject.ans;
        break;
      case 6:
        newGameObject = sudokuGameData7.searchSData(gameID);
        newGameData = newGameObject.data;
        newGameAns = newGameObject.ans;
        break;
      case 7:
        newGameObject = sudokuGameData8.searchSData(gameID);
        newGameData = newGameObject.data;
        newGameAns = newGameObject.ans;
        break;
      case 8:
        newGameObject = sudokuGameData9.searchSData(gameID);
        newGameData = newGameObject.data;
        newGameAns = newGameObject.ans;
        break;
      case 9:
        newGameObject = sudokuGameData10.searchSData(gameID);
        newGameData = newGameObject.data;
        newGameAns = newGameObject.ans;
        break;
    }
    //console.log(newGameObject);
    sudoku.setGame(newGameData, newGameAns);
    setTimeout(() => {
      this.setData({
        generateOk: true
      })
      this.drawBoard();
      this.drawTable();
      this.timeStart();
      this.freshUI();
    }, 1200);
  },

  drawTable(num) {
    //Table
    var startPointX = lineWidth1 / 2 / ratio;
    var startPointY = lineWidth1 / 2 / ratio;
    var tempWidth = (tableWidthInPrx - lineWidth1 * 1.5) / ratio;
    var tempHeight = (tableHeighInPrx - lineWidth1 * 1.5) / ratio;
    let table = wx.createCanvasContext('table');
    //Zixuan，table table 格子线的颜色
    table.setStrokeStyle("gray");
    table.setLineWidth(lineWidth1 / ratio);
    table.rect(startPointX, startPointY, tempWidth, tempHeight);
    table.rect(startPointX, startPointY, tempWidth, tempHeight / 2);
    startPointX = (tableWidth + lineWidth1 * 1.5) / ratio;
    tempWidth = (tableWidth + lineWidth1) / ratio;
    tempHeight = (tableHeighInPrx - lineWidth1 * 1.5) / ratio;
    table.rect(startPointX, startPointY, tempWidth, tempHeight);
    startPointX = (tableWidth * 3 + lineWidth1 * 3.5) / ratio;
    table.rect(startPointX, startPointY, tempWidth, tempHeight);
    table.stroke();
    table.setFontSize(tableWidth * 0.7 / ratio);
    table.setTextAlign = 'center';
    //Zixuan table 里非选择数字的颜色
    table.setFillStyle("#4169E1")
    let adjustmentForTable = [1.4, 2.35, 3.35, 4.3, 0.3, 1.3, 2.3, 3.32, 4.4]
    for (var i = 1; i < 10; i++) {
      if (i == num) {
        //Zixuan，table 选中数字的颜色
        table.setFillStyle("#6495ED");
      }
      table.fillText(i.toString(), tableWidth / ratio * adjustmentForTable[i - 1] + lineWidth1 / ratio * i % 5, tableWidth * (3.2 + parseInt(i / 5) * 3.95) / 4 / ratio);
      //Zixuan table 里非选择数字的颜色
      table.setFillStyle("#4169E1");
    }
    table.draw();

    //!Table
  },

  drawBoard() {
    //Board
    let board = wx.createCanvasContext('board');
    //Zixuan board 里格子的线的颜色
    board.setStrokeStyle("#000000");
    board.setLineWidth(lineWidth1 * 2 / ratio);
    var startPointX = lineWidth1 / 2 / ratio;
    var startPointY = lineWidth1 / 2 / ratio;
    var tempWidth = (boardWidthInPrx - lineWidth1 * 1.5) / ratio;
    var tempHeight = (boardWidthInPrx - lineWidth1 * 1.5) / ratio;
    board.rect(startPointX, startPointY, tempWidth, tempHeight);
    //border

    startPointX = (cellWidth * 3 + lineWidth1 * 1.5 + lineWidth2 * 2) / ratio;
    tempWidth = (cellWidth * 3 + lineWidth2 * 2 + lineWidth1) / ratio;
    board.rect(startPointX, startPointY, tempWidth, tempHeight);
    board.rect(startPointY, startPointX, tempHeight, tempWidth);
    board.stroke();
    //devide board into 9 parts

    board.setLineWidth(lineWidth2 / ratio);
    startPointX = (cellWidth + lineWidth1 + lineWidth2 / 2) / ratio;
    startPointY = lineWidth2 / 2;
    tempWidth = (cellWidth + lineWidth2) / ratio;
    tempHeight = (boardWidthInPrx - lineWidth2 * 3.5) / ratio;
    board.rect(startPointX, startPointY, tempWidth, tempHeight);
    board.rect(startPointY, startPointX, tempHeight, tempWidth);
    startPointX = (cellWidth * 4 + lineWidth1 * 2 + lineWidth2 * 2.5) / ratio;
    board.rect(startPointX, startPointY, tempWidth, tempHeight);
    board.rect(startPointY, startPointX, tempHeight, tempWidth);
    startPointX = (cellWidth * 7 + lineWidth1 * 3 + lineWidth2 * 4.5) / ratio;
    board.rect(startPointX, startPointY, tempWidth, tempHeight);
    board.rect(startPointY, startPointX, tempHeight, tempWidth);
    //devide part into 9 cells

    board.stroke();
    board.draw();

    //!Board
  },

  cellSelect(event) {
    selectY = parseInt(event.changedTouches[0].x / (boardWidthInPx / 9));
    selectX = parseInt(event.changedTouches[0].y / (boardWidthInPx / 9));
    //console.log(selectX + " " + selectY);
    
    if (selectNum != -1) {
      sudoku.setData(selectX, selectY, selectNum, currentNote);
      if(errorShow) {
        sudoku.freshProperty()
        if(level > 5)
          sudoku.freshDiagonal()
      }
      this.freshUI();
    }
    selectNum = -1;
    this.drawTable();
  },

  tableSelect(event) {
    selectNum = parseInt(event.changedTouches[0].y / (tableHeighInPx / 2)) * 5 + parseInt(event.changedTouches[0].x / (tableWidthInPx / 5));
    this.drawTable(selectNum);
    if (sameNumHighlight) {
      sudoku.highlightNum(selectNum);
      this.freshUI();
    }
  },

  toLevelSelect() {
    wx.redirectTo({
      url: '/pages/level_select/level_select',
    })
  },

  timeStart() {
    timer = setInterval(this.countTime, 1000);
  },

  countTime() {
    strH = zeroFill('' + parseInt(num / 3600 % 24), 2);
    strM = zeroFill('' + parseInt(num / 60 % 24), 2);
    strS = zeroFill('' + parseInt(num % 60), 2);
    if ((parseInt(num / 3600 % 24)) > 0) {
      this.setData({
        timeText: strH + ':' + strM + ':' + strS
      })
    } else {
      this.setData({
        timeText: strM + ':' + strS
      })
    }
    num++;
  },

  timeStop() {
    clearInterval(timer)
  },

  changeNote() {
    currentNote = !currentNote;
  },

  freshUI() {
    let board = wx.createCanvasContext('boardData');
    board.setFontSize(cellWidth * 0.9 / ratio);
    var i, j, axis, baseLine;
    remainNum = 81;
    for (j = 0; j < 9; j++) {
      axis = (j + 0.2) * cellWidth + (1 + parseInt(j / 3)) * lineWidth1 + (j - parseInt(j / 3)) * lineWidth2;
      for (i = 0; i < 9; i++) {
        if (parseInt(sudoku.getData(i, j).content) != 0) {
          if (sudoku.getData(i, j).note == false) {
            remainNum--;
            baseLine = (i + 0.85) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + i * lineWidth2;
            board.setFillStyle(colorTable[sudoku.getData(i, j).color]);
            board.fillText(String(sudoku.getData(i, j).content), axis / ratio, baseLine / ratio);
          } else {
            baseLine = (i + 0.85) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + i * lineWidth2
            board.setFillStyle(colorTable[sudoku.getData(i, j).color]);
            board.setFontSize(cellWidth * 0.9 / Math.sqrt(sudoku.getData(i, j).content.length) / ratio)
            mutiDraw.drawMultipleNumbers(board, sudoku.getData(i, j).content, axis / ratio, baseLine / ratio)
            board.setFontSize(cellWidth * 0.9 / ratio)
          }
        } else if ((i == j || i + j == 8) && level > 4) {
          board.arc(((j + 0.5) * cellWidth + (1 + parseInt(j / 3)) * lineWidth1 + j * lineWidth2) / ratio, ((i + 0.5) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + i * lineWidth2) / ratio, cellWidth / Math.sqrt(5) / ratio, 0, 2 * Math.PI)
          board.stroke()
          board.beginPath()
        }
      }
    }
    board.draw();
    if (remainNum == 0) {
      if (sudoku.judgeCorrect()) {
>>>>>>> 593032d70f089decd224442c10730600841ac093
        this.timeStop();
        timer = '0';
        strH = '0';
        strM = '0';
        strS = '0';
        num = 0;
        this.setData({
            timeText: '00:00'
        })
        var gameID = Math.floor(Math.random() * 200) + level * 1000;
        if (gameID > 9868)
            gameID = 9868
        var newGameObject, newGameData, newGameAns;
        switch (level) {
            case 0:
                newGameObject = sudokuGameData1.searchSData(gameID);
                newGameData = newGameObject.data;
                newGameAns = newGameObject.ans;
                break;
            case 1:
                newGameObject = sudokuGameData2.searchSData(gameID);
                newGameData = newGameObject.data;
                newGameAns = newGameObject.ans;
                break;
            case 2:
                newGameObject = sudokuGameData3.searchSData(gameID);
                newGameData = newGameObject.data;
                newGameAns = newGameObject.ans;
                break;
            case 3:
                newGameObject = sudokuGameData4.searchSData(gameID);
                newGameData = newGameObject.data;
                newGameAns = newGameObject.ans;
                break;
            case 4:
                newGameObject = sudokuGameData5.searchSData(gameID);
                newGameData = newGameObject.data;
                newGameAns = newGameObject.ans;
                break;
            case 5:
                newGameObject = sudokuGameData6.searchSData(gameID);
                newGameData = newGameObject.data;
                newGameAns = newGameObject.ans;
                break;
            case 6:
                newGameObject = sudokuGameData7.searchSData(gameID);
                newGameData = newGameObject.data;
                newGameAns = newGameObject.ans;
                break;
            case 7:
                newGameObject = sudokuGameData8.searchSData(gameID);
                newGameData = newGameObject.data;
                newGameAns = newGameObject.ans;
                break;
            case 8:
                newGameObject = sudokuGameData9.searchSData(gameID);
                newGameData = newGameObject.data;
                newGameAns = newGameObject.ans;
                break;
            case 9:
                newGameObject = sudokuGameData10.searchSData(gameID);
                newGameData = newGameObject.data;
                newGameAns = newGameObject.ans;
                break;
        }
        //console.log(newGameObject);
        sudoku.setGame(newGameData, newGameAns);
        setTimeout(() => {
            this.setData({
                generateOk: true
            })
            this.drawBoard();
            this.drawTable();
            this.timeStart();
            this.freshUI();
        }, 1200);
    },

    drawTable(num) {
        //Table
        var startPointX = lineWidth1 / 2 / ratio;
        var startPointY = lineWidth1 / 2 / ratio;
        var tempWidth = (tableWidthInPrx - lineWidth1 * 1.5) / ratio;
        var tempHeight = (tableHeighInPrx - lineWidth1 * 1.5) / ratio;
        let table = wx.createCanvasContext('table');
        //Zixuan，table table 格子线的颜色
        table.setStrokeStyle("gray");
        table.setLineWidth(lineWidth1 / ratio);
        table.rect(startPointX, startPointY, tempWidth, tempHeight);
        table.rect(startPointX, startPointY, tempWidth, tempHeight / 2);
        startPointX = (tableWidth + lineWidth1 * 1.5) / ratio;
        tempWidth = (tableWidth + lineWidth1) / ratio;
        tempHeight = (tableHeighInPrx - lineWidth1 * 1.5) / ratio;
        table.rect(startPointX, startPointY, tempWidth, tempHeight);
        startPointX = (tableWidth * 3 + lineWidth1 * 3.5) / ratio;
        table.rect(startPointX, startPointY, tempWidth, tempHeight);
        table.stroke();
        table.setFontSize(tableWidth * 0.7 / ratio);
        table.setTextAlign = 'center';
        //Zixuan table 里非选择数字的颜色
        table.setFillStyle("#4169E1")
        let adjustmentForTable = [1.4, 2.35, 3.35, 4.3, 0.3, 1.3, 2.3, 3.32, 4.4]
        for (var i = 1; i < 10; i++) {
            if (i == num) {
                //Zixuan，table 选中数字的颜色
                table.setFillStyle("#6495ED");
            }
            table.fillText(i.toString(), tableWidth / ratio * adjustmentForTable[i - 1] + lineWidth1 / ratio * i % 5, tableWidth * (3.2 + parseInt(i / 5) * 3.95) / 4 / ratio);
            //Zixuan table 里非选择数字的颜色
            table.setFillStyle("#4169E1");
        }
        table.draw();

        //!Table
    },

    drawBoard() {
        //Board
        let board = wx.createCanvasContext('board');
        //Zixuan board 里格子的线的颜色
        board.setStrokeStyle("#000000");
        board.setLineWidth(lineWidth1 * 2 / ratio);
        var startPointX = lineWidth1 / 2 / ratio;
        var startPointY = lineWidth1 / 2 / ratio;
        var tempWidth = (boardWidthInPrx - lineWidth1 * 1.5) / ratio;
        var tempHeight = (boardWidthInPrx - lineWidth1 * 1.5) / ratio;
        board.rect(startPointX, startPointY, tempWidth, tempHeight);
        //border

        startPointX = (cellWidth * 3 + lineWidth1 * 1.5 + lineWidth2 * 2) / ratio;
        tempWidth = (cellWidth * 3 + lineWidth2 * 2 + lineWidth1) / ratio;
        board.rect(startPointX, startPointY, tempWidth, tempHeight);
        board.rect(startPointY, startPointX, tempHeight, tempWidth);
        board.stroke();
        //devide board into 9 parts

        board.setLineWidth(lineWidth2 / ratio);
        startPointX = (cellWidth + lineWidth1 + lineWidth2 / 2) / ratio;
        startPointY = lineWidth2 / 2;
        tempWidth = (cellWidth + lineWidth2) / ratio;
        tempHeight = (boardWidthInPrx - lineWidth2 * 3.5) / ratio;
        board.rect(startPointX, startPointY, tempWidth, tempHeight);
        board.rect(startPointY, startPointX, tempHeight, tempWidth);
        startPointX = (cellWidth * 4 + lineWidth1 * 2 + lineWidth2 * 2.5) / ratio;
        board.rect(startPointX, startPointY, tempWidth, tempHeight);
        board.rect(startPointY, startPointX, tempHeight, tempWidth);
        startPointX = (cellWidth * 7 + lineWidth1 * 3 + lineWidth2 * 4.5) / ratio;
        board.rect(startPointX, startPointY, tempWidth, tempHeight);
        board.rect(startPointY, startPointX, tempHeight, tempWidth);
        //devide part into 9 cells

        board.stroke();
        board.draw();

        //!Board
    },

    cellSelect(event) {
        selectY = parseInt(event.changedTouches[0].x / (boardWidthInPx / 9));
        selectX = parseInt(event.changedTouches[0].y / (boardWidthInPx / 9));
        //console.log(selectX + " " + selectY);
        if (selectNum != -1) {
            sudoku.setData(selectX, selectY, selectNum, currentNote);
            if (errorShow) {
                sudoku.freshProperty()
                if (level > 5)
                    sudoku.freshDiagonal()
            }
            this.freshUI();
        }
        selectNum = -1;
        this.drawTable();
    },

    tableSelect(event) {
        selectNum = parseInt(event.changedTouches[0].y / (tableHeighInPx / 2)) * 5 + parseInt(event.changedTouches[0].x / (tableWidthInPx / 5));
        this.drawTable(selectNum);
        if (sameNumHighlight) {
            sudoku.highlightNum(selectNum);
            this.freshUI();
        }
    },

    toLevelSelect() {
        wx.redirectTo({
            url: '/pages/level_select/level_select',
        })
    },

    timeStart() {
        timer = setInterval(this.countTime, 1000);
    },

    countTime() {
        strH = zeroFill('' + parseInt(num / 3600 % 24), 2);
        strM = zeroFill('' + parseInt(num / 60 % 24), 2);
        strS = zeroFill('' + parseInt(num % 60), 2);
        if ((parseInt(num / 3600 % 24)) > 0) {
            this.setData({
                timeText: strH + ':' + strM + ':' + strS
            })
        } else {
            this.setData({
                timeText: strM + ':' + strS
            })
        }
        num++;
    },

    timeStop() {
        clearInterval(timer)
    },

    changeNote() {
        currentNote = !currentNote;
    },

    freshUI() {
        let board = wx.createCanvasContext('boardData');
        board.setFontSize(cellWidth * 0.9 / ratio);
        var i, j, axis, baseLine;
        remainNum = 81;
        for (j = 0; j < 9; j++) {
            axis = (j + 0.2) * cellWidth + (1 + parseInt(j / 3)) * lineWidth1 + (j - parseInt(j / 3)) * lineWidth2;
            for (i = 0; i < 9; i++) {
                if (parseInt(sudoku.getData(i, j).content) != 0) {
                    if (sudoku.getData(i, j).note == false) {
                        remainNum--;
                        baseLine = (i + 0.85) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + i * lineWidth2;
                        board.setFillStyle(colorTable[sudoku.getData(i, j).color]);
                        board.fillText(String(sudoku.getData(i, j).content), axis / ratio, baseLine / ratio);
                    } else {
                        baseLine = (i + 0.85) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + i * lineWidth2
                        board.setFillStyle(colorTable[sudoku.getData(i, j).color]);
                        board.setFontSize(cellWidth * 0.9 / Math.sqrt(sudoku.getData(i, j).content.length) / ratio)
                        mutiDraw.drawMultipleNumbers(board, sudoku.getData(i, j).content, axis / ratio, baseLine / ratio)
                        board.setFontSize(cellWidth * 0.9 / ratio)
                    }
                } else if ((i == j || i + j == 8) && level > 4) {
                    board.arc(((j + 0.5) * cellWidth + (1 + parseInt(j / 3)) * lineWidth1 + j * lineWidth2) / ratio, ((i + 0.5) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + i * lineWidth2) / ratio, cellWidth / Math.sqrt(5) / ratio, 0, 2 * Math.PI)
                    board.stroke()
                    board.beginPath()
                }
            }
        }
        board.draw();
        if (remainNum == 0) {
            if (sudoku.judgeCorrect()) {
                this.timeStop();
                sudoku.freeze();
                //Shuyuan
                wx.showToast();
            }
        }
    },

    canvasIdErrorCallback(e) {
        console.error(e.detail.errMsg);
    }
})


function zeroFill(str, n) {
    if (str.length < n) {
        str = '0' + str
    }
    return str
}