<template>   
<div >
<!-- 
    </v-navigation-drawer>    

    <v-content>  <v-app light>       
    <v-navigation-drawer height="100%" absolute   permanent  :clipped="clipped" v-model="drawer" enable-resize-watcher app dark class="primary ">
       <v-container fluid>
        <v-layout column>
            <v-card>
                <v-card-text>
                    <v-flex class="mb-4">
                        <v-avatar size="96" class="mr-4">
                            <img :src="'/avatars/avatar_' + (form.avatar.toLowerCase()) + '.png'" alt="Avatar">
                        </v-avatar>
                        <v-btn @click="openAvatarPicker">Change Avatar</v-btn>
                    </v-flex>
                    <v-text-field
                        v-model="form.firstName"
                        label="FirstName"></v-text-field>
                    <v-text-field
                        v-model="form.lastName"
                        label="Last Name"></v-text-field>
                    <v-text-field
                        v-model="form.contactEmail"
                        label="Email Address"></v-text-field>
                    <v-text-field
                        v-model="form.contactDepartment"
                        label="Department"></v-text-field>
                </v-card-text>
                
            </v-card>
        </v-layout>
        <avatar-picker
            v-model="showAvatarPicker"
            :current-avatar="form.avatar"
            @selected="selectAvatar"></avatar-picker>
    </v-container>
      <v-toolbar fixed app :clipped-right="clipped"  >
      Professor Portal
    </v-toolbar>  
      <v-container >
        
        
      </v-container>
    </v-content>
  </v-app>
  
         -->
    <h1>{{worksheet}}</h1>

</div>
</template>

<script>
    
    export default {
        name:'ProfessorPortal',
        data(){
          return{
            drawer: true,
            worksheet:'',
            clipped: false,
            loading: false,
            form: {
                        firstName: 'John',
                        lastName: 'Doe',
                        contactEmail: 'john@doe.com',
                        avatar: 'MALE_CAUCASIAN_BLOND_BEARD',
                        department: 'Computer'
                    },
            showAvatarPicker: false,
            methods: {
                // openAvatarPicker () {
                //     this.showAvatarPicker = true
                // },
                // selectAvatar (avatar) {
                //     this.form.avatar = avatar
                // },
                runexcel () {
                    // var xlsx= require("xlsx");
                    var fs = require('fs');

                    fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                    });
                    var excel = require('excel4node');

                    var workbook = new excel.Workbook();

                    var worksheet = workbook.addWorksheet('Sheet 1');

                    console.log(worksheet);
                    this.worksheet=worksheet;
                }
            }
          }
       }
    }
            
</script>

<style scoped>
</style>