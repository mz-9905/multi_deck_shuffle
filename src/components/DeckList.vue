<template>
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </symbol>
    </svg>
    <div v-if="getAlert" class="p-3 position-absolute top-0 start-50 translate-middle-x" style="width: 20rem;">
        <div class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24"><use xlink:href="#check-circle-fill"/></svg>
            <div>
                デッキリストを登録しました。
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" v-on:click="changeAlert(false)"></button>
            </div>
        </div>
    </div>
    <p>カードの追加</p>
    <div class="card mb-5 text-center" style="width: auto;">
        <div class="card-body row g-0">
            <div class="mb-3 col-sm-4">
                <label for="cardName" class="form-label">カード名</label>
                <input type="text" class="form-control" v-model="name">
            </div>
            <div class="px-3 mb-3 col-sm-7 row g-0">
                <div class="col-sm-2">
                    <label for="cardNum" class="form-label">カード枚数</label>
                    <input type="number" class="form-control" min="1" v-model="num">
                </div>
                <div class="px-3 py-4 col-sm-3">
                    <button class="btn btn-outline-primary" v-on:click="pushCard()">仮追加</button>
                </div>
            </div>
        </div>
    </div>
    <div class="row g-0">
        <div class="col-sm-2">
            <p>デッキリスト {{ deckNum }}枚</p>
        </div>
        <div class="col-sm-4">
            <button class="btn btn-outline-danger" v-on:click="makeSendDeckList()">デッキリスト登録</button>
        </div>
    </div>
    <div class="card" style="width: auto;">
        <div class="card-body">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>カード名</th>
                        <th>枚数</th>
                        <th>編集</th>
                        <th>削除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cards in getDeckList" :key="cards.id">
                        <td v-if="getEdits(cards.id)"><input class="form-control" v-model="cards.name"/></td>
                        <td v-else>{{ cards.name }}</td>
                        <td v-if="getEdits(cards.id)"><input type="number" class="form-control" min="1" v-model="cards.num"/></td>
                        <td v-else>{{ cards.num }}</td>
                        <td v-if="getEdits(cards.id)"><button v-on:click="editCard(cards)" class="btn btn-outline-danger">編集完了</button></td>
                        <td v-else><button v-on:click="editCard(cards)" class="btn btn-outline-success">編集</button></td>
                        <td v-if="getEdits(cards.id)"><button v-on:click="deleteCard(cards)" class="btn btn-outline-danger" disabled>削除</button></td>
                        <td v-else><button v-on:click="deleteCard(cards)" class="btn btn-outline-danger">削除</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DeckList',
    data(){
        return {
            deckList: [],//デッキリスト
            name: "",//カード名
            num: 1,//枚数
            edits: [],//編集中のカードのID一覧
            deckNum: 0,//現在のデッキリストの合計枚数
            alert: false,//アラート表示の有無
            first: true,//初回起動時かどうか
        };
    },
    created(){//起動時に自動実行
        if (this.first){//初回起動時のみ
            this.loadRegistList();
            this.first=false;
        }
    },
    methods:{
        loadRegistList(){//localStorageに登録済みのデッキリストとその枚数の読み込み
            let permit = this.$store.getters["permitStorage/getPermit"];
            if(permit){
                const registList = localStorage.getItem('registList');
                const registListNum = localStorage.getItem('registListNum');
                const registSendList = localStorage.getItem('registSendList');
                if(registList!=null) {
                    this.deckList = JSON.parse(registList);
                    this.$store.dispatch("shuffleRequest/saveDeckList",this.deckList);
                    this.deckNum = Number(registListNum);
                }
                if(registSendList!=null) {
                    this.$store.dispatch("shuffleRequest/saveSendDeckList",JSON.parse(registSendList));
                }
            }
        },
        saveDeckList(){//現在のデッキリストをlocalStorageに登録
            this.$store.dispatch("shuffleRequest/saveDeckList",this.deckList);
            let permit = this.$store.getters["permitStorage/getPermit"];
            if(permit){
                localStorage.setItem('registList',JSON.stringify(this.deckList));
                localStorage.setItem('registListNum',this.deckNum);
            }
        },
        makeSendDeckList(){//送信用のデッキリストを作成
            const sendDeckList=[];
            this.deckList.forEach(card=>{for(let i=0; i<card.num; i++) sendDeckList.push(card.name);});
            sendDeckList.filter(card=>{return card});//リスト表示用に加工
            this.$store.dispatch("shuffleRequest/saveSendDeckList",sendDeckList);
            let permit = this.$store.getters["permitStorage/getPermit"];
            if(permit) localStorage.setItem('registSendList',JSON.stringify(sendDeckList));
            this.changeAlert(true);
        },
        changeAlert(bool){//アラートの状態を変更
            this.alert=bool;
            //console.log(this.alert);
        },
        deleteCard(card){//任意のIDのカードを削除
            let deleteNum = 0;//削除枚数
            const tmpList = this.deckList;
            tmpList.forEach(deckCard=>{if(deckCard.id==card.id) deleteNum = deckCard.num;});
            this.deckNum -= deleteNum;//デッキ枚数を減らす
            this.deckList = tmpList.filter(deckCard=>{return deckCard.id!=card.id})//カードを削除
            this.saveDeckList();
        },
        getEdits(id){//IDが既に編集中の状態か確認
            let bln = false;
            this.edits.forEach(edit=>{if(edit==id) bln=true;});
            return bln;
        },
        editCard(card){//任意のIDのカードを編集開始/編集完了
            if(this.getEdits(card.id)){//編集中
                this.edits = this.edits.filter(edit=>{return edit!=card.id;});
                this.deckNum += card.num;//編集を完了したカードの枚数を追加
                this.saveDeckList();//保存(編集完了)
            } else {
                this.edits.push(card.id);//編集中のカードIDとして追加(編集開始)
                this.deckNum -= card.num;//編集中のカードについて、その枚数を予め減らしておく
            }
        },
        pushCard(){//任意のカードを追加
            if(this.name.length>0){//カード名が1文字以上入力されている場合のみ
                const card = {
                    id: Number(Date.now()).toString(16),//ID：日付のタイムスタンプ
                    name: this.name,//フォームに入力されたカード名
                    num: this.num,//フォームに入力された枚数
                }
                this.deckList.push(card);//デッキリストに追加
                this.name = "";//フォームのカード名の欄を空欄に変更(初期化)
                this.deckNum = this.deckNum + this.num;//デッキ枚数を増やす
                this.saveDeckList();//保存
            }
        },
    },
    computed:{
        getDeckList(){//deckListのゲッター
            return this.deckList.filter(card=>{return card;});//リスト表示用に加工
        },
        getAlert(){//alertのゲッター
            return this.alert;
        },
    }
}
</script>

<style scoped>
.card {
    border-color: #87cefa;
}
.btn-outline-primary {
    color: #87cefa;
    border-color: #87cefa;
}
.btn-outline-primary:hover {
    color: white;
    background-color: #87cefa;
}
</style>