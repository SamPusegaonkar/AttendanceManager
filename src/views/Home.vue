<template> 
  <v-app id="inspire" >
    <v-img src="..//icons//bg.png"> 
      <v-container class="fill-height" fluid>
        <v-card width="400" class="mx-auto mt-5">
          <v-card-title class="pb-0">
            <h1>Login</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-radio-group v-model="radios" row>
                <v-radio label="Admin " value="radio-1"></v-radio>
                <v-radio label="Professor" value="radio-2"></v-radio>
              </v-radio-group>
              <v-text-field v-model="Email" label="Email" prepend-icon="mdi-account-circle" :rules="[() => !!Email || 'This field is required']" :error-messages="errorMessages"/>
              <v-text-field v-model="Password" :type="showPassword ? 'text' : 'password'"  label="Password" :rules="[() => !!Password || 'This field is required']" :error-messages="errorMessages" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"/>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="primary" @click="test">Login</v-btn>
          </v-card-actions>
        </v-card>        
      </v-container>
    </v-img>
  </v-app>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "Mainpage",
    data() {
      return {
        Email:"",
        Password:"",
        radioGroup: 1,
        value:'',
        showPassword: false,
        prof_excel:'',
        radios:'radio-2',  
        success:'0'    
    }
  },
  watch: {
      Email () {
          this.errorMessages = ''
      },
  },

  methods:{
    test:function(){
      axios.post('http://localhost:3000/',{
        data:{prof_email:this.Email, password: this.Password}
      })
      .then(response=>{console.log(response.data)
      if(response.data=='1'){
        this.$router.push("/professorportal");                  
      }
      else{
        this.Email='';
        this.Password='';
      }
      
      }).catch(error =>{
        console.log(error);
        console.log('ERROR::',error.response.body)
      });
      console.log("success="+this.success);    
    },
  },
};
</script>

<style lang="scss">
</style>
