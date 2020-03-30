<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                
                <v-spacer />
                
              </v-toolbar>
              
              <v-card-text>

                <v-form v-on:submit="test">
                  <v-radio-group v-model="radios" row>
                    <v-radio label="Admin " value="radio-1"></v-radio>
                    <v-radio label="Professor" value="radio-2"></v-radio>
                  </v-radio-group>
                  <v-text-field
                    v-model="Email"
                    prepend-icon="mdi-account-circle"
                    label="Email"
                    required
                  />

                  <v-text-field
                    v-model="Password"
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="Password"
                    
                    
                  />
                  <v-card-actions>
                <v-spacer />
                <v-btn  color="primary" @click="test">Login</v-btn>
              </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
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
      
    }
  },
  methods:{
        test:function(){
          console.log("test");
          console.log(this.Email);
          console.log(this.Password);
          if(this.radios=='radio-2'){
            var i,counter=0;
            for (i = 1; i < this.prof_excel.length; i++) {
                if(this.Email==this.prof_excel[i][1] && this.Password==this.prof_excel[i][2]  ){
                    console.log("Successfull");
                    counter=1;
                    this.$router.push("/professorportal");
                    
                }
 
          
            } 
            if(counter==0){
              this.Email="";
              this.Password="";
              console.log("Failed");
            }
          }
        },
      },
  
  mounted(){
    axios.get('http://localhost:3000/').then((response)=>{
            this.prof_excel=response.data;
            
          })
    .catch((error)=>{
      console.log(error);
    });
  },
};
</script>

<style lang="scss"></style>
