# Node_list_soft

<link href="http://jasonm23.github.io/markdown-css-themes/markdown.css" rel="stylesheet"></link>


## Lesson1

### Node.js初期設定

NPMはインストール済

```shell
npm install express
node app.js
npm install -save ejs
```

* ejsファイルはviewsの中にいれる

外部読み込みは下で言うpublicに入れる
> /css/style.css なら public/css/style.cssを読む

```js
app.use(express.static('public'));
```

---

## Lesson2

Install the MySQL
`npm install mysql`

### SQL文 メモ書き

```sql
DROP TABLE list_app.items;

CREATE TABLE list_app.items (
	id int auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	CONSTRAINT id PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
```

`INSERT INTO list_app.items (name) VALUES('');`

```sql
INSERT INTO list_app.items (name) VALUES('じゃがいも');
INSERT INTO list_app.items (name) VALUES('にんじん');
INSERT INTO list_app.items (name) VALUES('たまねぎ');
```

---

## electron

npm -g install electron-prebuilt

cd C:\temp\07_electron
mkdir sample
cd sample

npm init -y

出てきたjsonのなんちゃら.js => main.jsに書き換え

デフォページ確認
`electron`

```shell
cd ../
electron sample/


npm install -g asar

asar pack ./sample ./sample.asar

electron sample.asar

npm i electron-packager -g

electron-packager ./sample sample --platform=darwin,win32 --arch=x64 --electronVersion=1.4.13
```

### package

package.jsonにモジュール記載必要

全部手打ち・・・？

## electron パッケージ化チャレンジ

electron標準のパッケージツールよりもelectron-builderが人気らしいのでチャレンジ。
zipにまとめたり、nsisでインストーラ作ったり。

### 事前準備

```shell
npm install --save-dev electron-builder
```

> パッケージで公開するモジュール用：dependencies
	開発のときにだけ使うモジュール用：devDependencies

```shell
# dependencies
npm install --save module_name

# devDependencies
npm install --save-dev module_name
```

### ディレクトリ構成

| dir                                    | comment                    |
| -------------------------------------- | -------------------------- |
| C:\temp\08_Nodejs\sample               | root                       |
| │  　  build-win.js                   | Build用設定                |
| │  　  package.json                   | モジュール、アプリ名の設定 |
| │  　  main.js                        | 大元のアプリ設定(起点)     |
| │  　  app.js                         | Webアプリ本体(router)       |
| ├  ─  public                         | 外部ファイル置き場         |
| │  　  ├  ─  css                    |                            |
| │  　  │  　  　  　  style.css      |                            |
| │  　  └  ─  images                 |                            |
| │  　  　  　  　  　  top.png        |                            |
| ├  ─  views                          | html(ejs)置き場            |
| │  　  　  　  top.ejs                | TOPページ                  |
| │  　  　  　  index.ejs              | データ一覧                 |
| │  　  　  　  new.ejs                | 新規登録                   |
| │  　  　  　  edit.ejs               | データ編集                 |
| │  　  　  　  hello.ejs              | テストページ               |
| ├  ─  build                          | build時に自動生成          |
| ├  ─  dist                           | build出力                  |
| │  　  │  　  sample Setup 1.0.0.exe | exe(Installer)             |
| │  　  │  　  sample-1.0.0-win.zip   | zip                        |
| │  　  └  ─  win-unpacked           | 解凍後の生データ           |
| └  ─  node_modules                   | npmでInstallしたモジュール |

### package.jsonの設定

```json
{
	"name": "sample", 			//アプリ名
	"version": "1.0.0",  
	"main": "main.js", 			//起点アプリ設定
	"scripts": {
		"start": "electron ." 	//npm start で実行されるScript
	},
	"keywords": [],
	"author": "",
	"license": "ISC",
	"dependencies": {  			// アプリで使用するmodule設定。現状手打ち。忘れるとエラー。
		"express": "~4.14.0",
		"mysql": "~2.18.1",
		"ejs": "~3.1.5"
	},
	"devDependencies": { 		//開発時のみ使用するモジュール。↑に入れるとエラー
		"electron-builder": "^22.8.1", //今回の。
		"electron":"1.4.13" 	// 現在Versionを直接指定。(下記詳細)
	},
	"description": ""
}
```

* electronのVersionは明示しないとエラー。

> Error: Cannot compute electron version from installed node modules  
> \- none of the possible > electron modules are installed.

electronのversion確認
`electron -v`  ← v は小文字

* electronやBuilderはdependencies だとエラー

> Error: Package "electron" is only allowed in "devDependencies". Please remove
> it from the "dependencies" section in your package.json.

### build-win

```js
const builder = require('electron-builder');

builder.build({
    config: {
        'appId': 'local.test.app1', 	//適宜変更
        'win':{
            'target': 'nsis' 		// Build形式：zip | nsis | 7z
         }
    }
});
```

### Build実行

```shell
node build-win
```

## git command

Alt+Dでエクスプローラのアドレスバーへ移動
cmdと打ち込んで押下
エクスプローラのDirがカレントになる。

### linux

win機能の有効化で、Linuxのサブシステムっぽいやつ
MS StoreでUbuntuインストール（会社だと使えないか・・・）

