<template>
    <div class="card" style="width: auto;">
        <div class="card-body row g-0">
            <div class="mb-4 col-sm-6">
                <p>シャッフルの種類</p>
                <div class="form-check">
                    <input type="radio" class="form-check-input" id="hindu" v-model="kind" value="hindu">
                    <label for="hindu" class="form-check-label">ヒンズーシャッフル</label>
                </div>
                <div class="form-check">
                    <input type="radio" class="form-check-input" id="deal" v-model="kind" value="deal">
                    <label for="deal" class="form-check-label">ディールシャッフル</label>
                </div>
                <div class="form-check">
                    <input type="radio" class="form-check-input" id="farrow" v-model="kind" value="farrow">
                    <label for="farrow" class="form-check-label">ファローシャッフル</label>
                </div>
                <div class="form-check">
                    <input type="radio" class="form-check-input" id="over" v-model="kind" value="over">
                    <label for="over" class="form-check-label">オーバーハンドシャッフル</label>
                </div>
            </div>
            <div class="col-sm-6">
                <p>シャッフル回数 ( 1 ~ 20回 )</p>
                <label for="formRange" class="form-label">現在の指定回数：{{ num }}回</label>
                <input type="range" class="form-range" min="1" max="20" step="1" id="num" v-model="num">
            </div>
            <button v-if="getRequestState" class="btn btn-outline-primary" disabled>実行中</button>
            <button v-else class="btn btn-outline-primary" v-on:click="execution">実行</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShuffleSelect',
    data() {
        return {
            kind:"hindu",//シャッフルの種類
            num:"3",//シャッフル回数
        }
    },
    methods:{
        execution() {//storeに値を渡しつつ、フラグを立てて実行
            this.$store.dispatch("shuffleRequest/saveKind",this.kind);
            this.$store.dispatch("shuffleRequest/saveNum",this.num);
            this.$store.dispatch("shuffleRequest/changeRequest");
        },
    },
    computed:{
        getRequestState(){
            return this.$store.getters["shuffleRequest/getRequest"];
        }
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