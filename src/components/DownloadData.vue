<template>
    <div class="px-3 py-3 text-center" style="width: auto;">
        <div class="p-3">
            <span class="h3">登録済みデッキリスト</span>
            <hr>
            <div class="p-3">
                <p>カード名 + 枚数</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button v-if="getRegistDeckList!=null" v-on:click="downloadDeckList('regist','txt',false)" class="btn btn-outline-secondary">txt</button>
                    <button v-else v-on:click="downloadDeckList('regist','txt',false)" class="btn btn-outline-secondary" disabled>txt</button>
                    <button v-if="getRegistDeckList!=null" v-on:click="downloadDeckList('regist','csv',false)" class="btn btn-outline-success">csv</button>
                    <button v-else v-on:click="downloadDeckList('regist','csv',false)" class="btn btn-outline-success" disabled>csv</button>
                    <button v-if="getRegistDeckList!=null" v-on:click="downloadDeckList('regist','json',false)" class="btn btn-outline-danger">json</button>
                    <button v-else v-on:click="downloadDeckList('regist','json',false)" class="btn btn-outline-danger" disabled>json</button>
                </div>
            </div>
            <div class="p-3">
                <p>ID ( タイムスタンプ ) + カード名 + 枚数</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button v-if="getRegistDeckList!=null" v-on:click="downloadDeckList('regist','txt',true)" class="btn btn-outline-secondary">txt</button>
                    <button v-else v-on:click="downloadDeckList('regist','txt',true)" class="btn btn-outline-secondary" disabled>txt</button>
                    <button v-if="getRegistDeckList!=null" v-on:click="downloadDeckList('regist','csv',true)" class="btn btn-outline-success">csv</button>
                    <button v-else v-on:click="downloadDeckList('regist','csv',true)" class="btn btn-outline-success" disabled>csv</button>
                    <button v-if="getRegistDeckList!=null" v-on:click="downloadDeckList('regist','json',true)" class="btn btn-outline-danger">json</button>
                    <button v-else v-on:click="downloadDeckList('regist','json',true)" class="btn btn-outline-danger" disabled>json</button>
                </div>
            </div>
        </div>
        <div class="p-3">
            <span class="h3"><span class="text-primary">シャッフル前</span>のデッキリスト</span>
            <hr>
            <div class="p-3">
                <p>カード名 + 枚数</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button v-if="getBeforeDeckList!=null" v-on:click="downloadDeckList('before','txt',false)" class="btn btn-outline-secondary">txt</button>
                    <button v-else v-on:click="downloadDeckList('before','txt',false)" class="btn btn-outline-secondary" disabled>txt</button>
                    <button v-if="getBeforeDeckList!=null" v-on:click="downloadDeckList('before','csv',false)" class="btn btn-outline-success">csv</button>
                    <button v-else v-on:click="downloadDeckList('before','csv',false)" class="btn btn-outline-success" disabled>csv</button>
                    <button v-if="getBeforeDeckList!=null" v-on:click="downloadDeckList('before','json',false)" class="btn btn-outline-danger">json</button>
                    <button v-else v-on:click="downloadDeckList('before','json',false)" class="btn btn-outline-danger" disabled>json</button>
                </div>
            </div>
        </div>
        <div class="p-3">
            <span class="h3"><span class="text-danger">シャッフル後</span>のデッキリスト</span>
            <hr>
            <div class="p-3">
                <p>カード名 + 枚数</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button v-if="getResultDeckList!=null" v-on:click="downloadDeckList('result','txt',false)" class="btn btn-outline-secondary">txt</button>
                    <button v-else v-on:click="downloadDeckList('result','txt',false)" class="btn btn-outline-secondary" disabled>txt</button>
                    <button v-if="getResultDeckList!=null" v-on:click="downloadDeckList('result','csv',false)" class="btn btn-outline-success">csv</button>
                    <button v-else v-on:click="downloadDeckList('result','csv',false)" class="btn btn-outline-success" disabled>csv</button>
                    <button v-if="getResultDeckList!=null" v-on:click="downloadDeckList('result','json',false)" class="btn btn-outline-danger">json</button>
                    <button v-else v-on:click="downloadDeckList('result','json',false)" class="btn btn-outline-danger" disabled>json</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DownloadData',
    data(){
        return {
            deckList: null,//出力するデッキリスト
            fname: null,//ファイル名
        }
    },
    methods:{
        downloadDeckList(step,kind,assignmentId){//デッキリストのダウンローダー
            let blob = null;
            let unique = null;
            switch(step){//ユーザが指定した段階のデッキリストを抽出
                case "regist"://登録
                    this.outputRegistDeckList(assignmentId);//出力用JSONに変換
                    unique = "regist_decklist_";
                    break;
                case "before"://シャッフル前
                    this.outputShuffleDeckList(assignmentId,false);
                    unique = "shuffle_before_decklist_";
                    break;
                case "result"://シャッフル後
                    this.outputShuffleDeckList(assignmentId,true);
                    unique = "shuffle_result_decklist_"
                    break;
                default://本来到達しない
                    alert("error: 存在しないデッキリストが選択されています。")
                    unique = "error_"
            }
            switch(kind){//ユーザの希望する形式に変換
                case "json":
                    blob = new Blob([JSON.stringify(this.deckList, null, '  ')], {type: 'application/json'});
                    this.makeFileName(unique,assignmentId,".json");
                    break;
                case "csv":
                    this.JSON2CSV(false);
                    blob = new Blob([this.deckList],{type: 'application/octet-stream'});
                    this.makeFileName(unique,assignmentId,".csv");
                    break;
                case "txt":
                    this.JSON2CSV(true);
                    blob = new Blob([this.deckList],{type: 'application/octet-stream'});
                    this.makeFileName(unique,assignmentId,".txt");
                    break;
                default://本来到達しない
                    alert("error: 未対応の拡張子が入力されています。");
            }
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = this.fname;
            link.click();
            link.remove();
        },
        outputRegistDeckList(assignmentId){//登録デッキリストを出力用デッキリスト(JSON)として作成
            if(assignmentId){//各カードのユニークIDを残したまま出力
                this.deckList = this.getRegistDeckList;
            } else {//ユニークIDは削除して出力
                this.deckList=[];//初期化
                const tmp = this.getRegistDeckList;
                for (let i=0; i<tmp.length; i++) {//カード毎にIDを削除
                    const card = {
                        name: tmp[i].name,
                        num: tmp[i].num,
                    }
                    this.deckList.push(card)
                }
            }
        },
        outputShuffleDeckList(assignmentId,shuffle){//シャッフル前後のデッキリストを出力用デッキリスト(JSON)として作成
            this.deckList=[];
            let tmp=null;
            if(shuffle){//シャッフル後
                tmp = this.getResultDeckList;
            } else {//シャッフル前
                tmp = this.getBeforeDeckList;
            }
            if(assignmentId){//各カードのユニークIDを追加して出力
                tmp.forEach(card=>{
                    const element = {
                        id: Number(Date.now()).toString(16),//ID：日付のタイムスタンプ
                        name: card,//カード名
                    }
                    this.deckList.push(element);//IDとnameのセットで追加
                })
            } else {//ユニークIDを追加せずに出力
                tmp.forEach(card=>{this.deckList.push({name:card})});//nameというkeyで追加
            }
        },
        JSON2CSV(headerLess){//JSON → CSV
            const tmp = this.deckList;
            this.deckList = null;//初期化
            const header = Object.keys(tmp[0]).join(',') + "\n";//csvのヘッダー部分
            const body = tmp.map(card => {return Object.keys(card).map(key => {return card[key];}).join(',');}).join("\n");//csvのボディ部分
            if(headerLess){
                this.deckList = body;
            } else {
                this.deckList = header + body;
            }
        },
        makeFileName(unique,assignmentId,extension){//出力ファイル名を決定
            this.fname = unique;//出力対象
            if(assignmentId) this.fname += "assignment_id_";//ユニークIDを削除しているかどうか
            this.fname += Number(Date.now()).toString(16) + extension;//タイムスタンプ+拡張子
        }
    },
    computed:{
        getRegistDeckList(){
            return this.$store.getters["shuffleRequest/getDeckList"];
        },
        getBeforeDeckList(){
            return this.$store.getters["shuffleRequest/getSendDeckList"];
        },
        getResultDeckList(){
            return this.$store.getters["shuffleRequest/getResultDeckList"];
        },
    }
}
</script>