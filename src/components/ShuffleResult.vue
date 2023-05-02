<template>
    <div class="py-3 text-center row g-0">
        <div class="p-2 col-sm-6">
            <h6 class="text-danger">シャッフル後</h6>
            <div class="card card-body">
                <table class="table table-striped">
                    <tbody>
                        <tr v-for="cards in getResultList" :key="cards">
                            <td>{{ cards }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="p-2 col-sm-6">
            <h6 class="text-primary">シャッフル前</h6>
            <div class="card card-body">
                <table class="table table-striped">
                    <tbody>
                        <tr v-for="cards in getSendList" :key="cards">
                            <td>{{ cards }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShuffleResult',
    computed:{
        getSendList(){//シャッフル前のデッキリスト表示
            return this.$store.getters["shuffleRequest/getSendDeckList"];
        },
        getResultList(){//シャッフル後のデッキリスト表示
            return this.$store.getters["shuffleRequest/getResultDeckList"];
        },
    }
}
</script>

<style scoped>
.card {
    border-color: #87cefa;
}
</style>