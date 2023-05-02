<template>
    <div v-if="getPermit==null" class="card m-3 position-absolute bottom-0 start-0" style="width: 25rem;">
        <div class="card-body row g-0">
            <div class="card-title">プライバシー設定</div>
            <p class="card-text">
                当サイトでは、入力された内容の一部を現在お使いのブラウザに保存することで、今後の入力の手間を減らす機能を備えています。「許可」ボタンをクリックすることで、その機能が有効化されます。拒否した場合でも、当サイトの他の機能は問題なく利用できます。
            </p>
            <details class="mb-3">
                <summary>保存内容 詳細</summary>
                <ul>
                    <li>入力されたデッキリストの内容</li>
                    <li>「許可」ボタンをクリックしたこと (次回以降に「許可」ボタンをクリックする手間をなくすため)</li>
                </ul>
            </details>
            <div class="col-sm-3">
                <button class="btn btn-danger" v-on:click="savePermit(false)">拒否</button>
            </div>
            <div class="col-sm-3">
                <button class="btn btn-success" v-on:click="savePermit(true)">許可</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PermitStorage',
    data(){
        return {
            permit: null,//許可したかどうか
        };
    },
    created(){//起動時に自動実行
        this.loadRegistPermit();
    },
    methods:{
        loadRegistPermit(){
            const registPermit = localStorage.getItem('registPermit');
            if(registPermit!=null) this.savePermit(registPermit);
        },
        savePermit(bool){
            if(bool) {
                this.permit = true;
                this.$store.dispatch("permitStorage/changePermit");
                localStorage.setItem("registPermit",this.permit);
            } else {
                this.permit = false;
            }
        }
    },
    computed:{
        getPermit(){//permitのゲッター
            return this.permit;
        }
    }
}

</script>

<style scoped>
.card {
    color: #fafafa;
    background-color: #a0a0a0;
    outline-color: #202020;
}
</style>