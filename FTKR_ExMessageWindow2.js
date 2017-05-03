//=============================================================================
// 一度に複数のメッセージウィンドウを表示するプラグイン(v2)
// FTKR_ExMessageWindow2.js
// 作成者     : フトコロ
// 作成日     : 2017/04/24
// 最終更新日 : 2017/05/02
// バージョン : v2.0.4
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EMW = true;

var FTKR = FTKR || {};
FTKR.EMW = FTKR.EMW || {};

//=============================================================================
/*:
 * @plugindesc v2.0.4 一度に複数のメッセージウィンドウを表示するプラグイン
 * @author フトコロ
 * 
 * @param Create ExWindow Number
 * @desc 拡張ウィンドウを生成する数を設定します。
 * 0 - マップ上のイベントの数だけ生成します
 * @default 1
 *
 * @help 
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * このプラグインを使用することで、文章の表示イベントで以下の動作が
 * 可能になります。
 * 
 * 1. 複数のメッセージウィンドウを画面に表示できます。
 * 
 * 2. メッセージ表示中にプレイヤーの行動を許可できます。
 * 
 * 3. 表示中のメッセージウィンドウを強制終了させることができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 2. YEP_MessageCore.jsと組み合わせる場合は、本プラグインを
 *    YEP_MessageCore.jsよりも下に配置してください。
 * 
 * 3. 本プラグインは、FTKR_ExMessageWindow.js (v1.x.x)と組み合わせて
 *    使用できません。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 拡張メッセージウィンドウ と メッセージウィンドウIDについて
 *-----------------------------------------------------------------------------
 * 本プラグインを有効にすると、イベントコマンド「文章の表示」に
 * 使用するウィンドウに、MVデフォルトのメッセージウィンドウとは別の
 * 拡張メッセージウィンドウを使用します。
 * 
 * 拡張メッセージウィンドウは、メッセージウィンドウIDを持っており
 * このIDを変えることで、一度に複数のウィンドウを表示させることができます。
 * 
 * メッセージウィンドウIDは、プラグインのデフォルトで ID0 を使用します。
 * ID0 - MVデフォルトのメッセージウィンドウ
 * 
 * 
 * ＜ウィンドウIDの使用できる数＞
 * ウィンドウIDを何番まで使用できるかは以下の設定によります。
 * 1. プラグインパラメータ<Create ExWindow Number>の設定
 * 2. マップのメモ欄のタグ<EMW_生成数: x>または<EMW_NUMBER: x> の x値
 * 
 * マップデータのメモ欄の設定を優先します。
 * 設定値が 2 なら、ID0 ~ ID2 まで使用できます。
 * 
 * 
 * ＜ウィンドウIDの注意点＞
 * 本プラグインは、ウィンドウIDの数だけウィンドウデータを生成します。
 * ウィンドウIDの数が多すぎる場合、その分処理が重くなる可能性があります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 拡張メッセージウィンドウを使用した文章の表示方法
 *-----------------------------------------------------------------------------
 * 以下にイベント例を示します。
 * 
 * 
 * ◆プラグインコマンド：EMW_メッセージウィンドウ指定 1
 * ◆文章：なし, ウィンドウ, 下
 * ：　　：会話中に行動可能になる制御文字が使えるぜ！
 * ：　　：いいだろう？
 * ◆プラグインコマンド：EMW_メッセージウィンドウ指定 2
 * ◆文章：なし, ウィンドウ, 上
 * ：　　：いいね！
 * 
 * 
 * プラグインコマンド「EMW_メッセージウィンドウ指定 x」を使うことで
 * 表示させるウィンドウIDを指定します。
 * 
 * 上記の例では、一つ目の文章をメッセージウィンドウID1に表示し、
 * 二つ目の文章をID2に表示します。
 * このように、文章イベントの実行前にプラグインコマンドで設定します。
 * 
 * ただし、このままではメッセージウィンドウID1とメッセージウィンドウID2は
 * 同時に表示しません。
 * メッセージウィンドウID1が消えた後にメッセージウィンドウID2が表示します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 拡張メッセージウィンドウを使用した複数のメッセージウィンドウの表示方法
 *-----------------------------------------------------------------------------
 * メッセージウィンドウID1を表示したままメッセージウィンドウID2を表示させる
 * ためには、以下のイベントの組み方が必要です。
 * 
 * 
 * ◆プラグインコマンド：EMW_メッセージウィンドウ指定 1 終了禁止
 * ◆文章：なし, ウィンドウ, 下
 * ：　　：会話中に行動可能になる制御文字が使えるぜ！
 * ：　　：いいだろう？\^
 * ◆プラグインコマンド：EMW_メッセージウィンドウ指定 2 終了禁止
 * ◆文章：なし, ウィンドウ, 上
 * ：　　：いいね！
 * ◆プラグインコマンド：EMW_メッセージウィンドウ指定 1
 * ◆文章：なし, ウィンドウ, 下
 * ：　　：だよな
 * ◆プラグインコマンド：EMW_メッセージウィンドウ指定 2 終了許可
 * ◆文章：なし, ウィンドウ, 上
 * ：　　：俺もやってみるよ！
 * ◆プラグインコマンド：EMW_メッセージウィンドウ強制終了 1
 * 
 * 
 * 今度は、二人が交互に２回会話するイベントです。
 * 先ほどの例とことなり、プラグインコマンドの引数が変わっています。
 * 
 * ウィンドウ指定のコマンドに、'終了禁止'をつけることで
 * 指定したウィンドウを閉じなくすることができます。
 * 
 * 最後の文章表示前のプラグインコマンドの'終了許可'によって
 * ウィンドウID2は、文章表示後にウィンドウが閉じるようになります。
 * 
 * また、最後のコマンドによって、ウィンドウID1は強制的に閉じます。
 * 
 * 
 * このような流れで、メッセージウィンドウを複数表示することができます。
 * あとは、2番目の文章と3番目の文章の間に、プラグインコマンドと文章を
 * 追加していくことで、長い会話イベントを作成することができます。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 行動許可の設定方法(制御文字)
 *-----------------------------------------------------------------------------
 * 以下の制御文字を文章中に入力することで、メッセージ表示中の
 * プレイヤーの行動可否を設定できます。
 * 
 * \EMP - 行動を許可
 * \DMP - 行動を禁止
 * 
 * 
 *-----------------------------------------------------------------------------
 * 行動許可中の文章の表示
 *-----------------------------------------------------------------------------
 * イベントの文章表示中にプレイヤーの行動を許可した場合
 * 別のイベントと会話イベントを起こすことが可能です。
 * 
 * この場合、文章表示中のメッセージウィンドウIDとは別のウィンドウIDに
 * 表示させる必要があります。
 * 
 * 文章表示のイベントコマンドの前に、ウィンドウIDを指定するコマンドを
 * 実行してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 文章を表示しているイベントに話しかけたい場合
 *-----------------------------------------------------------------------------
 * 文章を表示しているイベントに話しかけたい場合は、以下のイベントの作成方法が
 * あります。
 * 
 * 1. 自動で表示させる文章表示イベントの作成
 * 「自律移動」のタイプ「カスタム」のルート設定内に、以下のスクリプトを
 * 入力することで文章を表示させます。
 * 
 * スクリプト
 * $gameMessageEx.window(1).add('\\EMP文章\\|\\^')
 * 
 * window(1) は 文章を表示させるウィンドウID の番号を指定します。
 * ここでは、例としてID1 を使用します。
 * 
 * add()内には、表示する文章を入力します。
 * この時、制御文字「\\EMP」でプレイヤーの行動を許可させて、
 * 制御文字「\\|」でウィンドウを1秒表示させます。
 * 制御文字「\\^」でプレイヤーの入力待ちを不要にします。
 * 
 * 
 * 2. 話しかけて表示させる文章表示イベントの作成
 * 上記と同じページの実行内容に以下のイベントを作成します。(一例です)
 * 
 * トリガーは「決定ボタン」です。
 * 
 * 実行内容
 * ◆プラグインコマンド：EMW_メッセージウィンドウ強制終了 1
 * ◆プラグインコマンド：EMW_メッセージウィンドウ指定 2
 * ◆文章：なし, ウィンドウ, 下
 * ：　　：話しかけるな！
 * 
 * 1行目のコマンドで、自動表示しているウィンドウを消します。
 * この時に指定する番号は、スクリプト内で使用したウィンドウIDと
 * 合わせてください。
 * 
 * 2行目に別のウィンドウIDを指定して、3行目で文章を表示します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * プラグインコマンド
 *-----------------------------------------------------------------------------
 * 1. 文章の表示の強制終了
 * 
 * EMW_メッセージウィンドウ強制終了 すべて
 * EMW_MESSAGEWINDOW_CLOSE ALL
 * EMW_メッセージウィンドウ強制終了 Id
 * EMW_MESSAGEWINDOW_CLOSE Id
 * 
 * 表示されているメッセージウィンドウを強制的に閉じます。
 *  すべて - 表示しているすべてのウィンドウIDを強制的に閉じます。
 *  Id　　 - 指定したウィンドウのIDを強制的に閉じます。
 *    　　   指定しない場合は、ウィンドウID0 を閉じます。
 * 
 * 
 * 2. 文章を表示するウィンドウを指定
 * 
 * EMW_メッセージウィンドウ指定 Id (終了禁止/終了許可)
 * EMW_MESSAGEWINDOW_SET Id (NOEND/CANCLOSE)
 * 
 * このコマンド以降に文章を表示する場合に使用する拡張ウィンドウの
 * メッセージウィンドウIDを指定します。
 * 
 * '終了禁止' または '終了許可' をつけると
 * IDの指定と合わせて、ウィンドウの開閉設定ができます。
 * 
 * 
 * 3. 文章を表示するウィンドウの指定をリセット
 * 
 * EMW_メッセージウィンドウリセット
 * EMW_MESSAGEWINDOW_RESET
 * 
 * このコマンド以降に文章を表示する場合に使用する拡張ウィンドウの
 * メッセージウィンドウIDをリセットします。(ID0 になる)
 * 
 * 
 * 4. メッセージウィンドウの終了禁止(ウィンドウが閉じない)
 * 
 * EMW_メッセージウィンドウ終了禁止 Id
 * EMW_MESSAGEWINDOW_NOEND Id
 * 
 * 指定したIDのウィンドウはメッセージ表示後に閉じなくなります。
 * 禁止設定にしたウィンドウを閉じるためには以下の動作が必要です。
 * 
 *   a. 強制終了コマンドで閉じる
 *   b. 終了許可設定にした上で、新たにメッセージを表示させる。
 * 
 * 
 * 5. メッセージウィンドウの終了許可(ウィンドウが閉じる)
 * 
 * EMW_メッセージウィンドウ終了許可 Id
 * EMW_MESSAGEWINDOW_CANCLOSE Id
 * 
 * 指定したIDのウィンドウはメッセージ表示後に閉じるようになります。
 * 
 * 
 *-----------------------------------------------------------------------------
 * スクリプト
 *-----------------------------------------------------------------------------
 * 拡張メッセージウィンドウのゲームデータは以下のスクリプトで参照できます。
 * $gameMessageEx.window(ウィンドウID)
 * 
 * 
 * 拡張メッセージウィンドウのゲームデータに使用できる関数や変数は
 * MVデフォルトのメッセージウィンドウ($gameMessage)と同じです。
 * 
 * 以下に、スクリプトの一例を示します。
 * 
 * 1. 文章を表示
 * $gameMessageEx.window(ウィンドウID).add('文章')
 *    :'文章'には制御文字が使用できますが、この時は'\\v[1]'の用に
 *    :'\'記号を2つ使う必要があるので注意です。
 * 
 * 
 * 2. 顔画像の設定
 * $gameMessageEx.window(ウィンドウID).setFaceImage('顔画像名', 顔番号)
 *    :顔画像名 - 表示する顔画像のファイル名です。(例:'Actor1')
 *    :顔番号　 - ファイル内の何番目の顔かを指定する番号です。左上が 0番です。
 * 
 * 
 * 3. 背景の設定
 * $gameMessageEx.window(ウィンドウID).setBackground(背景番号)
 *    :背景番号 - ウィンドウ(0) か 暗くする(1) か 透明(2) から選びます。
 *    :          表示したい背景タイプの番号を指定してください。
 * 
 * 
 * 4. 表示位置の設定
 * $gameMessageEx.window(ウィンドウID).setPositionType(位置番号)
 *    :位置番号 - 上(0) か 中(1) か 下(2) から選びます。
 *    :          表示したい位置の番号を指定してください。
 * 
 * 
 * 5. 表示内容の初期化
 * $gameMessageEx.window(ウィンドウID).clear()
 *    :表示する文章や顔画像等の設定内容を初期化します。
 * 
 * 
 * 6. ウィンドウの終了禁止
 * $gameMessageEx.window(ウィンドウID).prohibitClose()
 *    :指定したウィンドウIDを終了禁止設定にします。
 * 
 * 
 * 7. ウィンドウの終了許可
 * $gameMessageEx.window(ウィンドウID).permitClose()
 *    :指定したウィンドウIDを終了許可設定にします。
 * 
 * 
 * 8. ウィンドウの強制終了
 * $gameMessageEx.window(ウィンドウID).terminate()
 *    :指定したウィンドウIDを強制終了します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2017 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v2.0.4 - 2017/05/02 : 機能追加、スクリプト追加
 *    1. マップメモ欄でウィンドウID生成数を設定するタグを追加
 * 
 * v2.0.3 - 2017/05/01 : プラグインパラメータの不具合修正
 *    1. <Create ExWindow Number>の設定値0の機能を削除
 * v2.0.2 - 2017/05/01 : 不具合修正
 * 
 * v2.0.1 - 2017/05/01 : 機能追加、ヘルプ修正
 *    1. 強制終了コマンドに表示中の全ウィンドウIDを指定する機能を追加
 * v2.0.0 - 2017/04/24 : v1から仕様全面見直し
 * 
 *-----------------------------------------------------------------------------
*/
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.EMW.parameters = PluginManager.parameters('FTKR_ExMessageWindow2');

FTKR.EMW.exwindowNum = Number(FTKR.EMW.parameters['Create ExWindow Number'] || '');
FTKR.EMW.nameWindows = [];

//objのメモ欄から <metacode: x> の値を読み取って配列で返す
var readObjectMeta = function(obj, metacodes) {
    if (!obj) return false;
    metacodes.some(function(metacode){
        var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
        return obj.note.match(metaReg);
    }); 
    return RegExp.$1 ? Number(RegExp.$1) : false;
};

//=============================================================================
// プラグインコマンド
//=============================================================================

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command.match(/EMW_(.+)/i)) {
        command = RegExp.$1;
        switch (true) {
            case /メッセージウィンドウ指定/i.test(command):
            case /MessageWindow_Set/i.test(command):
                this.setMessageWindowId(args);
                break;
            case /メッセージウィンドウリセット/i.test(command):
            case /MessageWindow_Reset/i.test(command):
                this._windowId = 0;
                break;
            case /メッセージウィンドウ強制クローズ/i.test(command):
            case /メッセージウィンドウ強制終了/i.test(command):
            case /MessageWindow_Close/i.test(command):
                this.messageWindowTerminate(args);
                break;
            case /メッセージウィンドウ終了禁止/i.test(command):
            case /MessageWindow_NoEnd/i.test(command):
                var windowId = Number(args[0] || 0);
                if (windowId >= 0) {
                    $gameMessageEx.window(windowId).prohibitClose();
                }
                break;
            case /メッセージウィンドウ終了許可/i.test(command):
            case /MessageWindow_CanClose/i.test(command):
                var windowId = Number(args[0] || 0);
                if (windowId >= 0) {
                    $gameMessageEx.window(windowId).permitClose();
                }
                break;
       }
    }
};

Game_Interpreter.prototype.setMessageWindowId = function(args) {
    var windowId = Number(args[0] || 0);
    if (windowId >= 0) {
        this._windowId = windowId;
        if (args[1] === '終了禁止' || args[1] && args[1].toUpperCase() === 'NOEND') {
            $gameMessageEx.window(windowId).prohibitClose();
        } else if (args[1] === '終了許可' || args[1] && args[1].toUpperCase() === 'CANCLOSE') {
            $gameMessageEx.window(windowId).clear();
            $gameMessageEx.window(windowId).permitClose();
        }
    }
};

Game_Interpreter.prototype.messageWindowTerminate = function(args) {
    if (args[0] === 'すべて' || args[0] && args[0].toUpperCase() === 'ALL') {
        $gameMessageEx.windows().forEach( function(message){
            message.terminate();
        });
    } else {
        var windowId = Number(args[0] || 0);
        if (windowId >= 0) {
            $gameMessageEx.window(windowId).terminate();
        }
    }
};

//=============================================================================
// メッセージ表示中でも行動可能にする処理を追加
// \EMP  \DMP
//=============================================================================

//------------------------------------------------------------------------
// Window_Message
//------------------------------------------------------------------------
FTKR.EMW.Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'EMP':
        !this._windowId ? $gameMessage.enabledCanMovePlayer() :
            $gameMessageEx.window(this._windowId).enabledCanMovePlayer();
        break;
    case 'DMP':
        !this._windowId ? $gameMessage.disabledCanMovePlayer() :
            $gameMessageEx.window(this._windowId).disabledCanMovePlayer();
        break;
    default:
        FTKR.EMW.Window_Message_processEscapeCharacter.call(this, code, textState);
        break;
    }
};

//書き換え
Window_Message.prototype.update = function() {
    this.checkToNotClose();
    Window_Base.prototype.update.call(this);
    while (this.updateConditions()) {
        if (this.updateWait()) {
            return;
        } else if (this.updateLoading()) {
            return;
        } else if (this.updateInput()) {
            return;
        } else if (this.updateMessage()) {
            return;
        } else if (this.canStart()) {
            this.startMessage();
        } else {
            this.startInput();
            return;
        }
    }
};

Window_Message.prototype.updateConditions = function() {
    return !this.isOpening() && !this.isClosing() && !$gameMessage.isLastText();
};

FTKR.EMW.Window_Message_updateWait = Window_Message.prototype.updateWait;
Window_Message.prototype.updateWait = function() {
    if ($gameMessage.isTerminate()) {
        this._waitCount = 0;
        if(this._textState) this._textState.index = this._textState.text.length;
        this._pauseSkip = true;
        return false;
    }
    return FTKR.EMW.Window_Message_updateWait.call(this);
};

FTKR.EMW.Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    if ($gameMessage.canClose()) FTKR.EMW.Window_Message_terminateMessage.call(this);
};

//------------------------------------------------------------------------
// Game_Message
//------------------------------------------------------------------------
FTKR.EMW.Game_Message_initialize = Game_Message.prototype.initialize;
Game_Message.prototype.initialize = function() {
    FTKR.EMW.Game_Message_initialize.call(this);
    this._permissionClose = true;
};

FTKR.EMW.Game_Message_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
    FTKR.EMW.Game_Message_clear.call(this);
    this._canMovePlayer = false;
    this._terminate = false;
    this._lastText = false;
    this._positionX = 1;
};

Game_Message.prototype.windowMessageEx = function() {
    return this._window_MessageEx;
}

Game_Message.prototype.canClose = function() {
    return this._permissionClose;
};

Game_Message.prototype.permitClose = function() {
    this._permissionClose = true;
};

Game_Message.prototype.prohibitClose = function() {
    this._permissionClose = false;
};

Game_Message.prototype.isTerminate = function() {
    return this._terminate;
}

Game_Message.prototype.terminate = function() {
    if (!this.isBusyBase()) return;
    this.permitClose();
    this._terminate = true;
    var message = this.windowMessageEx();
    if (message) {
        message.activate()
        message.terminateMessage();
    }
}

Game_Message.prototype.canMovePlayer = function() {
    return this._canMovePlayer;
};

Game_Message.prototype.enabledCanMovePlayer = function() {
    this._canMovePlayer = true;
};

Game_Message.prototype.disabledCanMovePlayer = function() {
    this._canMovePlayer = false;
};

Game_Message.prototype.isLastText = function() {
    return this._lastText;
};

Game_Message.prototype.firstText = function() {
    this._lastText = false;
};

Game_Message.prototype.lastText = function() {
    this._lastText = true;
};

FTKR.EMW.Game_Message_isBusy = Game_Message.prototype.isBusy;
Game_Message.prototype.isBusy = function() {
    return this.canMovePlayer() || (!this.canClose() && this.isLastText()) ?
        false : FTKR.EMW.Game_Message_isBusy.call(this);
};

Game_Message.prototype.isBusyBase = function() {
    return (this.hasText() || this.isChoice() ||
            this.isNumberInput() || this.isItemChoice());
}

//------------------------------------------------------------------------
// Game_Interpreter
//------------------------------------------------------------------------
FTKR.EMW.Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
    var waiting = false;
    switch (this._waitMode) {
    case 'messageEx':
        waiting = $gameMessageEx.windows().some(function(message){
            return message.isBusy();
        });
        break;
    default:
        waiting = FTKR.EMW.Game_Interpreter_updateWaitMode.call(this);
        break;
    }
    if (!waiting) {
        this._waitMode = '';
    }
    return waiting;
};

//=============================================================================
// メッセージを表示するイベントコマンドの修正
//=============================================================================

FTKR.EMW.Game_Interpreter_initialize = Game_Interpreter.prototype.initialize;
Game_Interpreter.prototype.initialize = function(depth) {
    FTKR.EMW.Game_Interpreter_initialize.call(this, depth);
    this._windowId = 0;
    this._messageWindowLists = [];
};

Game_Interpreter.prototype.windowId = function() {
    return this._windowId;
};

//------------------------------------------------------------------------
// 文章の表示
//------------------------------------------------------------------------
FTKR.EMW.Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
Game_Interpreter.prototype.command101 = function() {
    var windowId = this.windowId();
    if (!windowId) {
        return FTKR.EMW.Game_Interpreter_command101.call(this);
    } else {
        if (!$gameMessageEx.window(windowId).isBusy()) {
            $gameMessageEx.window(windowId).clear();
            $gameMessageEx.window(windowId).setFaceImage(this._params[0], this._params[1]);
            $gameMessageEx.window(windowId).setBackground(this._params[2]);
            $gameMessageEx.window(windowId).setPositionType(this._params[3]);
            this.continueMessages(windowId);
            switch (this.nextEventCode()) {
            case 102:  // Show Choices
                this._index++;
                this.setupChoices(this.currentCommand().parameters);
                break;
            case 103:  // Input Number
                this._index++;
                this.setupNumInput(this.currentCommand().parameters);
                break;
            case 104:  // Select Item
                this._index++;
                this.setupItemChoice(this.currentCommand().parameters);
                break;
            }
            this._index++;
            this.setWaitMode('messageEx');
        }
        return false;
    }
};

Game_Interpreter.prototype.continueMessages =function(windowId) {
    if (Imported.YEP_MessageCore) {
      while (this.isContinueMessageString()) {
        this._index++;
        if (this._list[this._index].code === 401) {
          $gameMessageEx.window(windowId).addText(this.currentCommand().parameters[0]);
        }
        if ($gameMessageEx.window(windowId)._texts.length >= $gameSystem.messageRows()) break;
      }
    } else {
        while (this.nextEventCode() === 401) {  // Text data
            this._index++;
            $gameMessageEx.window(windowId).add(this.currentCommand().parameters[0]);
        }
    }
};

//------------------------------------------------------------------------
// 選択肢の表示
//------------------------------------------------------------------------
FTKR.EMW.Game_Interpreter_command102 = Game_Interpreter.prototype.command102;
Game_Interpreter.prototype.command102 = function() {
    var windowId = this.windowId();
    if (!windowId) {
        return FTKR.EMW.Game_Interpreter_command102.call(this);
    } else {
        if (!$gameMessageEx.window(windowId).isBusy()) {
            this.setupChoices(this._params);
            this._index++;
            this.setWaitMode('messageEx');
        }
        return false;
    }
};

FTKR.EMW.Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
Game_Interpreter.prototype.setupChoices = function(params) {
    var windowId = this.windowId();
    if (!windowId) {
        FTKR.EMW.Game_Interpreter_setupChoices.call(this);
    } else {
        var choices = params[0].clone();
        var cancelType = params[1];
        var defaultType = params.length > 2 ? params[2] : 0;
        var positionType = params.length > 3 ? params[3] : 2;
        var background = params.length > 4 ? params[4] : 0;
        if (cancelType >= choices.length) {
            cancelType = -2;
        }
        $gameMessageEx.window(windowId).setChoices(choices, defaultType, cancelType);
        $gameMessageEx.window(windowId).setChoiceBackground(background);
        $gameMessageEx.window(windowId).setChoicePositionType(positionType);
        $gameMessageEx.window(windowId).setChoiceCallback(function(n) {
            this._branch[this._indent] = n;
        }.bind(this));
    }
};

//------------------------------------------------------------------------
// 数値入力の処理
//------------------------------------------------------------------------
FTKR.EMW.Game_Interpreter_command103 = Game_Interpreter.prototype.command103;
Game_Interpreter.prototype.command103 = function() {
    var windowId = this.windowId();
    if (!windowId) {
        return FTKR.EMW.Game_Interpreter_command103.call(this);
    } else {
        if (!$gameMessageEx.window(windowId).isBusy()) {
            this.setupNumInput(this._params);
            this._index++;
            this.setWaitMode('messageEx');
        }
        return false;
    }
};

FTKR.EMW.Game_Interpreter_setupNumInput = Game_Interpreter.prototype.setupNumInput;
Game_Interpreter.prototype.setupNumInput = function(params) {
    var windowId = this.windowId();
    if (!windowId) {
        FTKR.EMW.Game_Interpreter_setupNumInput.call(this);
    } else {
        $gameMessageEx.window(windowId).setNumberInput(params[0], params[1]);
    }
};

//------------------------------------------------------------------------
// アイテム選択の処理
//------------------------------------------------------------------------
FTKR.EMW.Game_Interpreter_command104 = Game_Interpreter.prototype.command104;
Game_Interpreter.prototype.command104 = function() {
    var windowId = this.windowId();
    if (!windowId) {
        return FTKR.EMW.Game_Interpreter_command104.call(this);
    } else {
        if (!$gameMessageEx.window(windowId).isBusy()) {
            this.setupItemChoice(this._params);
            this._index++;
            this.setWaitMode('messageEx');
        }
        return false;
    }
};

FTKR.EMW.Game_Interpreter_setupItemChoice = Game_Interpreter.prototype.setupItemChoice;
Game_Interpreter.prototype.setupItemChoice = function(params) {
    var windowId = this.windowId();
    if (!windowId) {
        FTKR.EMW.Game_Interpreter_setupItemChoice.call(this);
    } else {
        $gameMessageEx.window(windowId).setItemChoice(params[0], params[1] || 2);
    }
};

//=============================================================================
// Game_MessageEx
// メッセージの拡張ゲームデータクラス
//=============================================================================

function Game_MessageEx() {
    this.initialize.apply(this, arguments);
}

Game_MessageEx.prototype.initialize = function() {
    this._data = [];
    this._data[0] = $gameMessage;
};

Game_MessageEx.prototype.window = function(windowId) {
    if (!this._data[windowId]) {
        this._data[windowId] = new Game_Message();
    }
    return this._data[windowId];
};

Game_MessageEx.prototype.windows = function() {
    return this._data;
};

//=============================================================================
// Window_MessageEx
// メッセージの拡張ウィンドウクラス
//=============================================================================

function Window_MessageEx() {
    this.initialize.apply(this, arguments);
}

Window_MessageEx.prototype = Object.create(Window_Message.prototype);
Window_MessageEx.prototype.constructor = Window_MessageEx;

Window_MessageEx.prototype.initialize = function(windowId) {
    this._windowId = windowId;
    this._gameMessage = $gameMessageEx.window(this._windowId);
    Window_Message.prototype.initialize.call(this);
};

Window_MessageEx.prototype.createSubWindows = function() {
    this._goldWindow = new Window_Gold(0, 0);
    this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
    this._goldWindow.openness = 0;
    this._choiceWindow = new Window_ChoiceListEx(this, this._windowId);
    this._numberWindow = new Window_NumberInputEx(this, this._windowId);
    this._itemWindow = new Window_EventItemEx(this, this._windowId);
};

Window_MessageEx.prototype.canStart = function() {
    return this._gameMessage.hasText() && !this._gameMessage.scrollMode();
};

Window_MessageEx.prototype.startMessage = function() {
    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters(this._gameMessage.allText());
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.open();
    this.activate();
};

Window_MessageEx.prototype.updateConditions = function() {
    return !this.isOpening() && !this.isClosing() && !this._gameMessage.isLastText();
};

Window_MessageEx.prototype.updatePlacement = function() {
    this._positionType = this._gameMessage.positionType();
    this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
    this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
};

Window_MessageEx.prototype.updateBackground = function() {
    this._background = this._gameMessage.background();
    this.setBackgroundType(this._background);
};

Window_MessageEx.prototype.terminateMessage = function() {
    this._gameMessage.lastText();
    if (this._gameMessage.canClose()) {
        if (Imported.YEP_MessageCore) this._nameWindow.deactivate();
        this.close();
        this._goldWindow.close();
        this._gameMessage.clear();
    } else {
        this.deactivate();
    }
};

Window_MessageEx.prototype.startInput = function() {
    if (this._gameMessage.isChoice()) {
        this._choiceWindow.start();
        return true;
    } else if (this._gameMessage.isNumberInput()) {
        this._numberWindow.start();
        return true;
    } else if (this._gameMessage.isItemChoice()) {
        this._itemWindow.start();
        return true;
    } else {
        return false;
    }
};

Window_MessageEx.prototype.doesContinue = function() {
    return (this._gameMessage.hasText() && !this._gameMessage.scrollMode() &&
            !this.areSettingsChanged());
};

Window_MessageEx.prototype.areSettingsChanged = function() {
    return (this._background !== this._gameMessage.background() ||
            this._positionType !== this._gameMessage.positionType());
};

Window_MessageEx.prototype.loadMessageFace = function() {
    this._faceBitmap = ImageManager.loadFace(this._gameMessage.faceName());
};

Window_MessageEx.prototype.drawMessageFace = function() {
    this.drawFace(this._gameMessage.faceName(), this._gameMessage.faceIndex(), 0, 0);
};

Window_MessageEx.prototype.newLineX = function() {
    return this._gameMessage.faceName() === '' ? 0 : 168;
};

Window_MessageEx.prototype.updateWait = function() {
    if (this._gameMessage.isTerminate()) {
        this._waitCount = 0;
        if(this._textState) this._textState.index = this._textState.text.length;
        this._pauseSkip = true;
        return false;
    }
    if (Imported.YEP_MessageCore && this.isFastForward()) return false;
    if (this._waitCount > 0) {
        this._waitCount--;
        return true;
    } else {
        return false;
    }
};

//=============================================================================
// Window_ChoiceListEx
// 選択肢の拡張ウィンドウクラス
//=============================================================================

function Window_ChoiceListEx() {
    this.initialize.apply(this, arguments);
}

Window_ChoiceListEx.prototype = Object.create(Window_ChoiceList.prototype);
Window_ChoiceListEx.prototype.constructor = Window_ChoiceListEx;

Window_ChoiceListEx.prototype.initialize = function(messageWindow, windowId) {
    this._windowId = windowId;
    this._gameMessage = $gameMessageEx.window(this._windowId);
    Window_ChoiceList.prototype.initialize.call(this, messageWindow);
};

Window_ChoiceListEx.prototype.selectDefault = function() {
    this.select(this._gameMessage.choiceDefaultType());
};

Window_ChoiceListEx.prototype.updatePlacement = function() {
    var positionType = this._gameMessage.choicePositionType();
    var messageY = this._messageWindow.y;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    switch (positionType) {
    case 0:
        this.x = 0;
        break;
    case 1:
        this.x = (Graphics.boxWidth - this.width) / 2;
        break;
    case 2:
        this.x = Graphics.boxWidth - this.width;
        break;
    }
    if (messageY >= Graphics.boxHeight / 2) {
        this.y = messageY - this.height;
    } else {
        this.y = messageY + this._messageWindow.height;
    }
};

Window_ChoiceListEx.prototype.updateBackground = function() {
    this._background = this._gameMessage.choiceBackground();
    this.setBackgroundType(this._background);
};

Window_ChoiceListEx.prototype.numVisibleRows = function() {
    var messageY = this._messageWindow.y;
    var messageHeight = this._messageWindow.height;
    var centerY = Graphics.boxHeight / 2;
    var choices = this._gameMessage.choices();
    var numLines = choices.length;
    var maxLines = 8;
    if (messageY < centerY && messageY + messageHeight > centerY) {
        maxLines = 4;
    }
    if (numLines > maxLines) {
        numLines = maxLines;
    }
    return numLines;
};

Window_ChoiceListEx.prototype.maxChoiceWidth = function() {
    var maxWidth = 96;
    var choices = this._gameMessage.choices();
    for (var i = 0; i < choices.length; i++) {
        var choiceWidth = this.textWidthEx(choices[i]) + this.textPadding() * 2;
        if (maxWidth < choiceWidth) {
            maxWidth = choiceWidth;
        }
    }
    return maxWidth;
};

Window_ChoiceListEx.prototype.makeCommandList = function() {
    var choices = this._gameMessage.choices();
    for (var i = 0; i < choices.length; i++) {
        this.addCommand(choices[i], 'choice');
    }
};

Window_ChoiceListEx.prototype.isCancelEnabled = function() {
    return this._gameMessage.choiceCancelType() !== -1;
};

Window_ChoiceListEx.prototype.callOkHandler = function() {
    this._gameMessage.onChoice(this.index());
    this._messageWindow.terminateMessage();
    this.close();
};

Window_ChoiceListEx.prototype.callCancelHandler = function() {
    this._gameMessage.onChoice(this._gameMessage.choiceCancelType());
    this._messageWindow.terminateMessage();
    this.close();
};

//=============================================================================
// Window_NumberInputEx
// 数値入力の拡張ウィンドウクラス
//=============================================================================

function Window_NumberInputEx() {
    this.initialize.apply(this, arguments);
}

Window_NumberInputEx.prototype = Object.create(Window_NumberInput.prototype);
Window_NumberInputEx.prototype.constructor = Window_NumberInputEx;

Window_NumberInputEx.prototype.initialize = function(messageWindow, windowId) {
    this._windowId = windowId;
    this._gameMessage = $gameMessageEx.window(this._windowId);
    Window_NumberInput.prototype.initialize.call(this, messageWindow);
};

Window_NumberInputEx.prototype.start = function() {
    this._maxDigits = this._gameMessage.numInputMaxDigits();
    this._number = $gameVariables.value(this._gameMessage.numInputVariableId());
    this._number = this._number.clamp(0, Math.pow(10, this._maxDigits) - 1);
    this.updatePlacement();
    this.placeButtons();
    this.updateButtonsVisiblity();
    this.createContents();
    this.refresh();
    this.open();
    this.activate();
    this.select(0);
};

Window_NumberInputEx.prototype.processOk = function() {
    SoundManager.playOk();
    $gameVariables.setValue(this._gameMessage.numInputVariableId(), this._number);
    this._messageWindow.terminateMessage();
    this.updateInputData();
    this.deactivate();
    this.close();
};

//=============================================================================
// Window_EventItemEx
// アイテム選択の拡張ウィンドウクラス
//=============================================================================

function Window_EventItemEx() {
    this.initialize.apply(this, arguments);
}

Window_EventItemEx.prototype = Object.create(Window_EventItem.prototype);
Window_EventItemEx.prototype.constructor = Window_EventItemEx;

Window_EventItemEx.prototype.initialize = function(messageWindow, windowId) {
    this._windowId = windowId;
    this._gameMessage = $gameMessageEx.window(this._windowId);
    Window_EventItem.prototype.initialize.call(this, messageWindow);
};

Window_EventItemEx.prototype.includes = function(item) {
    var itypeId = this._gameMessage.itemChoiceItypeId();
    return DataManager.isItem(item) && item.itypeId === itypeId;
};

Window_EventItemEx.prototype.onOk = function() {
    var item = this.item();
    var itemId = item ? item.id : 0;
    $gameVariables.setValue(this._gameMessage.itemChoiceVariableId(), itemId);
    this._messageWindow.terminateMessage();
    this.close();
};

Window_EventItemEx.prototype.onCancel = function() {
    $gameVariables.setValue(this._gameMessage.itemChoiceVariableId(), 0);
    this._messageWindow.terminateMessage();
    this.close();
};

//=============================================================================
// 拡張メッセージを登録
//=============================================================================
//ゲームオブジェクトに登録
FTKR.EMW.DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    FTKR.EMW.DataManager_createGameObjects.call(this);
    $gameMessageEx = new Game_MessageEx();
};

//マップ画面で拡張メッセージウィンドウを生成
FTKR.EMW.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    FTKR.EMW.Scene_Map_createAllWindows.call(this);
    this.createMessageExWindowAll();
};

//プラグインパラメータで指定した数の拡張メッセージウィンドウを生成
//またはマップデータのメモ欄の設定を読み込む
Scene_Map.prototype.createMessageExWindowAll = function() {
    this._messageExWindows = [];
    var number = this.readMapMeta() || FTKR.EMW.exwindowNum;
    for (var i = 1; i < number + 1; i++) {
        this.createMessageExWindow(i);
    }
};

Scene_Map.prototype.readMapMeta = function() {
    return readObjectMeta($dataMap, ['EMW_生成数', 'EMW_NUMBER']);
};

//拡張メッセージウィンドウを生成
Scene_Map.prototype.createMessageExWindow = function(windowId) {
    this._messageExWindows[windowId] = new Window_MessageEx(windowId);
    $gameMessageEx.window(windowId)._window_MessageEx = this._messageExWindows[windowId];
    this.addWindow(this._messageExWindows[windowId]);
    this._messageExWindows[windowId].subWindows().forEach(function(window) {
        this.addWindow(window);
    }, this);
};

//=============================================================================
// YEP_MessageCore.jp の修正
//=============================================================================
if (Imported.YEP_MessageCore) {

//------------------------------------------------------------------------
// Window_MessageEx
//------------------------------------------------------------------------

FTKR.EMW.Window_MessageEx_createSubWindows = Window_MessageEx.prototype.createSubWindows;
Window_MessageEx.prototype.createSubWindows = function() {
    FTKR.EMW.Window_MessageEx_createSubWindows.call(this);
    this._nameWindow = new Window_NameBoxEx(this, this._windowId);
    FTKR.EMW.nameWindows[this._windowId] = this._nameWindow;
    var scene = SceneManager._scene;
    scene.addChild(this._nameWindow);
};

FTKR.EMW.Window_MessageEx_startMessage = Window_MessageEx.prototype.startMessage;
Window_MessageEx.prototype.startMessage = function() {
    this._nameWindow.deactivate();
    FTKR.EMW.Window_MessageEx_startMessage.call(this);
};

Window_MessageEx.prototype.wordwrapWidth = function(){
    if (Yanfly.Param.MSGTightWrap && this._gameMessage.faceName() !== '') {
        return this.contents.width - this.newLineX();
    }
    return Window_Base.prototype.wordwrapWidth.call(this);
};

Window_MessageEx.prototype.newLineX = function() {
    if (this._gameMessage.faceName() === '') {
        return 0;
    } else {
        return eval(Yanfly.Param.MSGFaceIndent);
    }
};

Window_MessageEx.prototype.convertNameBox = function(text) {
    var windowId = this._windowId;
    text = text.replace(/\x1bN\<(.*?)\>/gi, function() {
        return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 1);
    }, this);
    text = text.replace(/\x1bN1\<(.*?)\>/gi, function() {
        return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 1);
    }, this);
    text = text.replace(/\x1bN2\<(.*?)\>/gi, function() {
        return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 2);
    }, this);
    text = text.replace(/\x1bN3\<(.*?)\>/gi, function() {
        return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 3);
    }, this);
    text = text.replace(/\x1bNC\<(.*?)\>/gi, function() {
        return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 3);
    }, this);
    text = text.replace(/\x1bN4\<(.*?)\>/gi, function() {
        return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 4);
    }, this);
    text = text.replace(/\x1bN5\<(.*?)\>/gi, function() {
        return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 5);
    }, this);
    text = text.replace(/\x1bNR\<(.*?)\>/gi, function() {
        return FTKR.EMW.nameWindows[windowId].refresh(arguments[1], 5);
    }, this);
    return text;
};

Window_MessageEx.prototype.convertActorFace = function(actor) {
    this._gameMessage.setFaceImage(actor.faceName(), actor.faceIndex());
    return '';
};

if (Yanfly.Param.MSGNameBoxClose) {
Window_MessageEx.prototype.hasDifferentNameBoxText = function() {
    var texts = this._gameMessage._texts;
    var length = texts.length;
    var open = this._nameWindow.isOpen();
    for (var i = 0; i < length; ++i) {
    var text = texts[i];
    if (text.length <= 0) continue;
    if (Yanfly.MsgMacro) {
        text = this.convertMacroText(text);
        text = text.replace(/\x1b/gi, '\\');
    }
    if (text.match(/\\(?:N|N1|N2|N3|N4|N5|NC|NR)<(.*)>/i)) {
        var name = String(RegExp.$1);
    } else if (text.match(/\\(?:ND|ND1|ND2|ND3|ND4|ND5|NDC|NDR)<(.*)>/i)) {
        var name = String(RegExp.$1);
    } else if (text.match(/\\(?:NT|NT1|NT2|NT3|NT4|NT5|NTC|NTR)<(.*)>/i)) {
        var name = String(RegExp.$1);
    }
    if (name) {
        name = name.replace(/\\V\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        name = name.replace(/\\V\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        name = name.replace(/\\N\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
        }.bind(this));
        name = name.replace(/\\P\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
        }.bind(this));
        name = name.replace(/\\/gi, '\x1b');
    }
    if (name && !open) return true;
    if (name && name !== this._nameWindow._lastNameText) {
        return true;
    }
    }
    if (open && !name) return true;
    return false;
};
}

//------------------------------------------------------------------------
// Window_ChoiceListEx
//------------------------------------------------------------------------
FTKR.EMW.Window_ChoiceListEx_updatePlacement = Window_ChoiceListEx.prototype.updatePlacement;
Window_ChoiceListEx.prototype.updatePlacement = function() {
    FTKR.EMW.Window_ChoiceListEx_updatePlacement.call(this);
    var messagePosType = this._gameMessage.positionType();
    if (messagePosType === 0) {
        this.y = this._messageWindow.height;
    } else if (messagePosType === 2) {
        this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
    }
};

//------------------------------------------------------------------------
// Window_NumberInputEx
//------------------------------------------------------------------------
Window_NumberInputEx.prototype.updatePlacement = function() {
    Window_NumberInput.prototype.updatePlacement.call(this);
    var messageY = this._messageWindow.y;
    var messagePosType = this._gameMessage.positionType();
    if (messagePosType === 0) {
        this.y = this._messageWindow.height;
    } else if (messagePosType === 1) {
        if (messageY >= Graphics.boxHeight / 2) {
            this.y = messageY - this.height;
        } else {
            this.y = messageY + this._messageWindow.height;
        }
    } else if (messagePosType === 2) {
        this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
    }
};

//------------------------------------------------------------------------
// Window_EventItemEx
//------------------------------------------------------------------------
Window_EventItemEx.prototype.updatePlacement = function() {
    Window_EventItem.prototype.updatePlacement.call(this);
    var messagePosType = this._gameMessage.positionType();
    if (messagePosType === 0) {
        this.y = Graphics.boxHeight - this.height;
    } else if (messagePosType === 2) {
        this.y = 0;
    }
};

//------------------------------------------------------------------------
// Window_NameBoxEx
// ネームボックスの拡張ウィンドウクラス
//------------------------------------------------------------------------
function Window_NameBoxEx() {
    this.initialize.apply(this, arguments);
}

Window_NameBoxEx.prototype = Object.create(Window_NameBox.prototype);
Window_NameBoxEx.prototype.constructor = Window_NameBoxEx;

Window_NameBoxEx.prototype.initialize = function(parentWindow, windowId) {
    this._windowId = windowId;
    this._gameMessage = $gameMessageEx.window(this._windowId);
    Window_NameBox.prototype.initialize.call(this, parentWindow);
};

Window_NameBoxEx.prototype.adjustPositionY = function() {
    if (this._gameMessage.positionType() === 0) {
      this.y = this._parentWindow.y + this._parentWindow.height;
      this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
    } else {
      this.y = this._parentWindow.y;
      this.y -= this.height;
      this.y += eval(Yanfly.Param.MSGNameBoxBufferY);
    }
    if (this.y < 0) {
      this.y = this._parentWindow.y + this._parentWindow.height;
      this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
    }
};

}//YEP_MessageCore.jp
