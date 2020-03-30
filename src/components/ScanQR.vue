<template>
<div >
  <v-app light>       
    <v-navigation-drawer height="100%" absolute   permanent  :clipped="clipped" v-model="drawer" enable-resize-watcher app dark class="primary">
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
    </v-navigation-drawer>    

    <v-content>
      <v-toolbar fixed app :clipped-right="clipped"   >
      Scan your ID
    </v-toolbar>  
      <v-container >
        <StreamBarcodeReader
            @decode="onDecode"
            @loaded="onLoaded"
        ></StreamBarcodeReader>
        
      </v-container>
    </v-content>
  </v-app>
  
        
</div>

</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";


export default {
    name:'ScanQR',
    components:{
      StreamBarcodeReader
    },
    data(){
      return{
        drawer: true,
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
            openAvatarPicker () {
                this.showAvatarPicker = true
            },
            selectAvatar (avatar) {
                this.form.avatar = avatar
            }
        }
      }
    }
    
  }
  


</script>

<style scoped>
  
</style>