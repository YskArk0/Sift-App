//GASのAPIのURL（各自変更してください。）
const endpoint =
"https://script.google.com/macros/s/AKfycbxSL7e1rFYTDGIOwD6zo2gZavuhO7_7bCetPf0IJigF3Q15QbZS0KX3lHub5GTqGgVxRQ/exec";

//APIを使って非同期データを取得する
fetch(endpoint)
.then(response => response.json())
/*成功した処理*/
.then(data => {
    //JSONから配列に変換
    const object = data;
    //inputタグそれぞれに取得したデータを設定
    $('input').each(function (index, element) {
        if (object[1][$(element).attr('name')]) {
            $(element).val([object[1][$(element).attr('name')]]);
        }
        
    });
    alert(object);
});
