<template>
    <div>
        <div class="loginTop">
            <div></div>
            <div>{{middleTop}}</div>
            <div>
                <slot name="right" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["middleTop"]
    
}
</script>

<style scoped>
.loginTop {
    height: 12.5vw;
    background-color: #fff;
    display: flex;
}

.loginTop div {
    flex: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
}
</style>