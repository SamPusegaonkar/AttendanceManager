<template>   
    <div id="#app" :class="[{'collapsed' : collapsed}]">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
        <h1>Professor Portal</h1>
          <div class="demo">
        <sidebar-menu :collapsed="collapsed" :menu="menu" :theme="selectedTheme" :show-one-child="true" @collapse="onCollapse" @itemClick="onItemClick" >
        </sidebar-menu>
        <h1>
          vue-sidebar-menu
          <a
            style="color: #000;text-transform: uppercase;font-size: 14px;font-weight: 400;"
            href="https://github.com/yaminncco/vue-sidebar-menu">
            Github
          </a>
        </h1>
        <p>A vue.js sidebar menu component</p>
        <div>
          Select theme:
          <select v-model="selectedTheme">
            <option
              v-for="(theme, index) in themes"
              :key="index"
            >
              {{ theme == '' ? 'default-theme' : theme }}
            </option>
          </select>
        </div>
        <hr style="margin: 50px 0px;border: 1px solid #e3e3e3;">
  </div>

    </div>
</template>

<script>
Vue.use(sidebarmenu.default);

    export default {
        name:'ProfessorPortal',
    }
            



  
</script>

<style scoped>

</style>