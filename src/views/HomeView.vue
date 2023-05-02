<template>
    <div class="home my-3 px-3">
        <!-- ピル部分 -->
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button type="button" class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">ホーム</button>
            </li>
            <li class="nav-item" role="presentation">
                <button type="button" class="nav-link" id="pills-register-tab" data-bs-toggle="pill" data-bs-target="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">デッキ登録</button>
            </li>
            <li class="nav-item" role="presentation">
                <button type="button" class="nav-link" id="pills-download-tab" data-bs-toggle="pill" data-bs-target="#pills-download" role="tab" aria-controls="pills-download" aria-selected="false">各種ダウンロード</button>
            </li>
        </ul>

        <!-- パネル部分 -->
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                <p>任意のデッキについて、種類や回数を選んでシャッフルすることができます。</p>
                <details class="mb-4">
                    <summary>使い方</summary>
                    <ol type="1">
                        <li>「デッキ登録」タブにて、シャッフルしたいデッキを登録</li>
                        <li>「ホーム」タブにて、シャッフルの種類を1つ選択</li>
                        <li>シャッフル回数を選択 (選択可能範囲: 1 ~ 20回)</li>
                        <li>「実行」ボタンをクリック ⇒ シャッフル開始 (シャッフル完了まで数秒ほどお待ちください)</li>
                        <li>シャッフルが完了したデッキに対して、別の種類や回数での更なるシャッフルも可能</li>
                    </ol>
                    <p>シャッフル前のデッキリスト、シャッフル後のデッキリストについて、デッキ内のカードの順番がそれぞれ表示されます。</p>
                    <p>各種デッキリストのデータは「各種ダウンロード」タブより手元にダウンロード可能です。</p>
                </details>
                <details class="mb-4">
                    <summary>各シャッフルの説明</summary>
                    <ul>
                        <li>ヒンズーシャッフル：左手に持ったデッキの下半分を右手で引き抜き、左手に残ったデッキの上に右手にあるカードを上から数枚ずつ重ねる工程を、右手のカードがなくなるまで繰り返す方法。</li>
                        <li>ディールシャッフル：複数個のカード束ができるように、デッキのカードを上から1枚ずつ順番に別々の束に重ね、最後にそれらの束を1つにまとめる方法。</li>
                        <li>ファローシャッフル：デッキをおおよそ同じ枚数になるように2等分し、それら2つの束のカードを交互に重ねていく方法。横入れシャッフル。</li>
                        <li>オーバーハンドシャッフル：左手に持ったデッキの上から数枚をまとめ、それを右手の親指を使って右手に移す操作を左手からカードがなくなるまで繰り返す方法。</li>
                    </ul>
                </details>
                <ShuffleSelect/>
                <ShuffleResult/>
            </div>
            <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                <details class="mb-4">
                    <summary>登録方法</summary>
                    <ol type="1">
                        <li>追加したいカードの名前と枚数を入力</li>
                        <li>「仮追加」ボタンをクリック ⇒ デッキリストにカードが仮追加される</li>
                        <li>追加したいカードを全て仮追加後、「デッキリスト登録」ボタンをクリック ⇒ デッキ登録完了</li>
                    </ol>
                </details>
                <DeckList/>
            </div>
            <div class="tab-pane fade" id="pills-download" role="tabpanel" aria-labelledby="pills-register-tab">
                各種デッキリストのデータを3種類の形式 ( txt , csv , json ) でダウンロードすることができます。
                <DownloadData/>
            </div>
        </div>
    </div>
</template>

<script>
import ShuffleSelect from '@/components/ShuffleSelect.vue';
import ShuffleResult from '@/components/ShuffleResult.vue';
import DeckList from '@/components/DeckList.vue';
import DownloadData from '@/components/DownloadData.vue';

export default {
    name: "HomeView",
    data(){
        return {
            kind:null,//シャッフルの種類
            num:null,//シャッフル回数
            deckList:null,//シャッフル対象のデッキリスト
            flag:false,//2回目以降のシャッフル時に立てるフラグ
        };
    },
    mounted() {
        this.$store.subscribe(mutation => {//ユーザがシャッフルをリクエストした際の処理
            if(mutation.type === "shuffleRequest/changeRequest"){
                if (this.$store.getters["shuffleRequest/getRequest"]){
                    this.sendPostRequest();
                }
            }
        })
    },
    methods: {
        sendPostRequest() {//シャッフルの種類と回数、デッキリストをPOSTしてシャッフル結果を得る
            this.kind=this.$store.getters["shuffleRequest/getKind"];//種類
            this.num=this.$store.getters["shuffleRequest/getNum"];//回数

            if(this.$store.getters["shuffleRequest/getResultDeckList"]!=null) {//1回以上シャッフル済みだった場合、シャッフル前デッキリストを更新
                this.deckList=this.$store.getters["shuffleRequest/getResultDeckList"];//前回のシャッフル後デッキリストを取得
                this.$store.dispatch("shuffleRequest/removeSendDeckList");//前回のシャッフル前デッキリストを削除
                this.$store.dispatch("shuffleRequest/removeResultDeckList");//前回のシャッフル後デッキリストを削除
                this.flag=true;//フラグを立てる
                this.sleep(3000);//5秒停止
            } else {
                this.deckList=this.$store.getters["shuffleRequest/getSendDeckList"];//デッキリスト
            }

            //Google App Scriptで構築したバックエンドにPOST
            let P_URL=new URL("https://script.google.com/macros/s/AKfycbzYr5rMyqgJ4xpMt0b90-vIU8fnaC5HSQ0fISp3a1EJDdQsNrkfpjK_u24w_4LnL6ktOg/exec")
            const body = new FormData();
            body.append("kind",this.kind);//種類
            body.append("num",this.num);//回数
            body.append("deckList",JSON.stringify(this.deckList));//デッキリスト
            fetch(P_URL,{
                method: "POST",
                body
            }).then((res) => {
                console.log(res);
                return res.text();
            }).then((data) => {
                this.init(data);
            }).catch(e => {
                alert(e + "\n予期せぬエラーが発生しました。");
            })
        },
        init(str) {//シャッフル結果を保存
            this.$store.dispatch("shuffleRequest/saveResultDeckList",JSON.parse(str));//今回のシャッフル結果を保存
            this.$store.dispatch("shuffleRequest/changeRequest");//リクエスト状態の変更
            if (this.flag) this.$store.dispatch("shuffleRequest/saveSendDeckList",this.deckList);//シャッフル前のデッキリストを保存
        },
        sleep(waitTime){//busy wait機能
            let startTime = new Date();
            while(new Date()-startTime < waitTime);//指定した秒数待つ
        },
    },
    components: { ShuffleSelect, ShuffleResult, DeckList, DownloadData },
}
</script>

<style scoped>
/* タブの色変更 */
.nav-pills .nav-link.active{
    background-color: #87cefa;
    color: white;
}

/* タブの文字色変更 */
.nav-pills .nav-link{
    color: #87cefa;
}
</style>