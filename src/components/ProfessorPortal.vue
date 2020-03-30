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
          Your Portal
    </v-toolbar>  
                <v-container class="pa-4 text-center">
                <v-row class="fill-height" align="center" justify="center">
                <template v-for="(item, i) in items">
                    <v-col
                    :key="i"
                    cols="12"
                    md="4"
                    >
                    <v-hover v-slot:default="{ hover }">
                        <v-card
                        :elevation="hover ? 12 : 2"
                        :class="{ 'on-hover': hover }"
                        >
                        <v-img
                            :src="item.img"
                            height="225px"
                        >
                            <v-card-title class="title white--text">
                            <v-row
                                class="fill-height flex-column"
                                justify="space-between"
                            >
                                <p class="mt-4 subheading text-left">{{ item.title }}</p>

                                <div>
                                <p class="ma-0 body-1 font-weight-bold font-italic text-left">
                                    {{ item.text }}
                                </p>
                                <p class="caption font-weight-medium font-italic text-left">
                                    {{ item.subtext }}
                                </p>
                                </div>

                                <div class="align-self-center">
                                <v-btn
                                    v-for="(icon, index) in icons"
                                    :key="index"
                                    :class="{ 'show-btns': hover }"
                                    color="transparent"
                                    icon
                                >
                                    <v-icon
                                    :class="{ 'show-btns': hover }"
                                    color="transparent"
                                    >
                                    {{ icon }}
                                    </v-icon>
                                </v-btn>
                                </div>
                            </v-row>
                            </v-card-title>
                        </v-img>
                        </v-card>
                    </v-hover>
                    </v-col>
                </template>
                </v-row>
            </v-container>
    </v-content>
  </v-app>     
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
            icons: ['mdi-play'],
            items: [
                {
                title: 'Add New Class',
                text: "It's New Release Friday",
                subtext: 'Newly released songs. Updated daily.',
                img: 'http://lorempixel.com/output/nightlife-q-c-640-480-5.jpg',
                },
                {
                title: 'View Attendance Analytics',
                text: 'Greatest Rock Hits',
                subtext: 'Lose yourself in rock tunes.',
                img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
                },
                {
                title: 'Mellow Moods',
                text: 'Ambient Bass',
                subtext: 'Chill beats to mellow you out.',
                img: 'http://lorempixel.com/output/abstract-q-c-640-480-6.jpg',
                },
            ],
            transparent: 'rgba(255, 255, 255, 0)',
                }
       }
    }
            
</script>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
 }

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>