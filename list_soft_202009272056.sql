INSERT INTO list_app.list_soft (reg_user,softName,sAbout,sPurpose,flag_arc) VALUES 
('AJ14013','管理者権限','ユーザー認証まで頑張らなくても、管理者モードと一般モードで切り替えできるくらいならできるかなって・・・','管理者として認証されたら、Display:None; な感じのClassを付け外し。
管理者認証はパスワード(ソース直書きか、DB ハッシュ変換)と一致判定かなあ。
Cookieで管理者判定残す。怖いから1日で削除くらい。',NULL)
,('memo','Edit','complete','textareaはinputと違い、valueアトリビュートがないため、
<textarea>テキスト</textarea> のように書く必要があります。','cmp')
,('idea','並び替えと検索','','',NULL)
,('memo','MySQL Nodejs','https://qiita.com/PianoScoreJP/items/7ed172cd0e7846641e13','','cmp')
,('memo','IIS','だめでした・・・
できるっぽいけど、単体でRun Serverしたほうがシンプル','','cmp')
,('task','削除前のアラート','削除前アラートを実装したい。
jsのAlertでOK？','参考にしたサイト
https://qiita.com/cordy/items/7e38085e7ac9c74a4db5','cmp')
,('task','ナビメニュー設定','グローバルナビゲーションメニュー設定
各ejsに上部のメニューを記述。
includeを使って共通メニューを読み込ませたい。','','cmp')
,('task','完了済みアイテム','完了したアイテムを非表示にして、
別ページで表示できるようにしたい。','DBに完了カラムを追加して、Nullなら未完。1とかなら完了判定。
UIは、Indexの右側に完了ボタンを設置。
ボタンを押す→Confirm:trueなら完了フラグON→非表示。
非表示：Where文設定でたぶんいける。SELECT * FROM list_soft where flag_c = "完了"
ボタン押す：INSERT INTO list_soft (flag_c) VALUES ("完了")
DB設計 → 非表示機能 → DB直接いじってデバッグ → ボタン押して完了フラグ付与実装
ここまで出来たら完了アイテムページの作成スタート。
スクロールできた・・・','cmp')
,('memo','Router切り分け','https://garafu.blogspot.com/2016/07/nodejs-express-webapp-tutorial.html','','cmp')
,('idea','サイト紹介ページ','新たなページを作る勉強も兼ねて。
このまま公開しちゃうとProgateさん無言ぱくりになってしまう。','',NULL)
;
INSERT INTO list_app.list_soft (reg_user,softName,sAbout,sPurpose,flag_arc) VALUES 
('task','レスポンシブ','拡大するとページすごい崩れる・・・','table widthでごり押し
CSS難しい','cmp')
,('task','Build試してみる','むずかしい・・・
若干独自記法よりのスクリプトを静的なスクリプトに変換する＆ファイルをまとめる感じ？','',NULL)
,('memo','express generator とは？','','',NULL)
,('memo','Bootstrap','https://qiita.com/maXayan/items/7a3a3ff551332e6f4edb','','cmp')
,('memo','templateインクルード','<%- include("./top_menu.ejs") %>  
C:\temp\08_Nodejs\list-app_build\views\top.ejs','','cmp')
,('idea','sqliteに切り替え','会社もっていったときに引き継ぎたいし・・・','',NULL)
,('memo','exeのアプリ起動でサーバー起動できてる','','',NULL)
;