// 初期画面起動時
var turn = 0 //1ターン目；黒―1、白
//盤面の状況を二次元配列で定義
var ban_ar = new Array(8) //ここで要素数が8の配列にする
for (var x = 0; x < ban_ar.length; x++){
    ban_ar[x]=new Array(8)
}
// console.log(ban_ar)
//インデックスは-0からだがarrayは1から数える

//htmlで定義したテーブルを取得
var ban = document.getElementById("field")


//取得したテーブルに盤面を作成
ban_new()

//盤面の初期化
ban_init()

//クリックしたときの実行されるイベント
for (var x = 0; x < 8; x++){
    for (var y = 0; y < 8; y++)
    var select_cell = ban.rows[x].cells[y];
    select_cell.onclick = function () {
        if (ban_ar[this.parentNode.rowIndex, this.cellIndex] == 0) {
            if (check_reverse(this.parentNode.rowIndex, this.cellIndex) > 0) {
                ban_set()
                cheng_turn()
            }
        }
    }
}


//テーブルで盤面を作成する処理
function ban_new() {
    for (var x = 0; x < 8; x++){
        var tr = document.createElement("tr")
        ban.appendChild(tr)
        for (var y = 0; y < 8; y++){
            var td = document.createElement("td")
            tr.appendChild(td)
        }
    }
}


//ここまで書いたら緑色の盤面が表示される


function ban_init() {
    //すべてクリア
    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++){
            ban_ar[x][y] = 0
        }
    }


    //初期状態では真ん中に白黒を配列
    ban_ar[3][3] = -1
    ban_ar[4][3] = 1
    ban_ar[3][4] = 1
    ban_ar[4][4] = -1
    ban_set()
    
    //ターンも初期化
    turn = 0
    cheng_turn()
}

//盤面状況を実際の盤面に反映させる処理

function ban_set() {
    var stone = ""
    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            switch (ban_ar[x][y]) {
                case 0:
                    stone = ""
                    break;
                case -1:
                    stone = "○"
                    break;
                case 1:
                    stone = "●"
                    break;
            }
            ban.rows[x].cells[y].innerText = stone;
        }
        
    }
    return true
}

//ターンを変更する処理
function cheng_turn() {
    var tarn_msg = document.getElementById("view_tarn")
    if (turn == 0) {
        turn = 1
        turn_msg.textContent = "黒の番です"
        return
    }
    //ターンを変更
    turn = turn * -1
    //ターンを後退して、置けるところがあるかを確認する
    //現状の配置をバックアップ
    var ban_bak = new Array(8)
    var check_reverse_cnt = 0
    for (var i = 0; i < ban_ar.length; i++){
        ban_bak[i]=new Array(8)
    }
    for (var x = 0; x < 8; x++){
        for (vary = 0; y < 8; y++){
            ban_bak[x][y]=ban_ar[x][y]
        }
    }
    var white_cnt = 0
    var black_cnt = 0
    for (var x=0; x < 8; x++) {
        for (var y = 0; y < 8; y++){
            //空白マスのみおけるのでチェック
            //それ以外は石の数の計算
            switch(ban_ar[x][y]){
                case 0:
                check_reverse_cnt = check_reverse_cnt + check_reverse(x, y)
                //バックアップから元に戻す
                for (var i = 0; i < 8; ii++){
                    for (var ii = 0; ii < 8; ii++){
                        ban_ar[i][ii]=ban_bak[i][ii]
                    }
                }
                break;
                case -1:
                white_cnt++
                break
                case 1:
                black_cnt++
                break
            }
        }
    }
    //白と黒の合計が8*8=64の場合は終了
    if (white_cnt + black_cnt == 64 || white_cnt == 0 || black_cnt == 0) {
        if (white_cnt == black_cnt) {
            alert("引き分けです")
        } else if (white_cnt > black_cnt) {
            alert("勝負は黒："+black_cnt+"対、白："+white_cnt+"で白の勝ち")
        } else {
            alert("勝負は黒:"+black_cnt+"対、白："+white_cnt+"で黒の勝ちです")
        }
    } else {
        //置ける場所がない場合はターンを相手に戻す
        if (check_reverse_cnt == 0) {
            switch (turn) {
                    case -1:
                    alert("白のおける場所がありません。続けて黒の番になります")
                    turn = turn * -1
                    break;
                    case 1:
                    alert("黒のおける場所がありません。続けて白の番となります。")
                    turn = turn * -1
                    break;
            }
        }
    }
    //ターンを表示
    switch (turn) {
        case -1:
            tarn_msg.textContent = "白の番です";
            break;
        case 1:
            tarn_msg.textContent = "黒の番です";
            break;
    }
}

