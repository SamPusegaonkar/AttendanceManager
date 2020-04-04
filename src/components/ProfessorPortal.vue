<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app clipped color="accent">
            <v-layout column>
                <v-card color="accent" >
                    <v-card-text>
                        <v-flex class="mb-4">
                            <v-avatar size="150">
                                <img
                                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                                    alt="John"
                                >
                            </v-avatar>
                            <v-btn color="primary" @click="openAvatarPicker">Change Avatar</v-btn>
                        </v-flex>
                        <v-text-field 
                            v-model="form.firstName"
                            label="FirstName"
                            readonly
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="form.lastName"
                            label="Last Name"
                            readonly
                        ></v-text-field>
                        <v-text-field
                            v-model="form.contactEmail"
                            label="Email Address"
                            readonly
                        ></v-text-field>
                        <v-text-field 
                            v-model="form.department"
                            label="Department"
                            readonly
                            required
                        ></v-text-field>
                        <v-text-field 
                            v-model="form.contactPhone"
                            label="Phone No."
                            readonly
                            required
                        ></v-text-field>
                    </v-card-text>
                </v-card>
            </v-layout>    
        </v-navigation-drawer>

        <v-app-bar app color="primary" class="white--text" clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"  class="white--text"/>
        <v-toolbar-title class="white--text">Your Portal</v-toolbar-title>
        </v-app-bar>
        <v-content >
            <v-img src="..//icons//bg.png"> 

            <v-container
            class="fill-height"
            fluid> 
                <v-container>
                    <v-row       class="mb-6">
                        <v-card hover class="mx-auto" max-width="400" @click.stop="dialog1 = true" > 
                            <v-img
                                src="..//icons//images.jpeg"
                                height="200px"
                                ></v-img>
                            <v-card-title color="primary" class="headline">Take Attendance</v-card-title>
                            <v-card-subtitle> Add new class details and take attendance using the barcode preesnt in the student ID</v-card-subtitle>
                            <v-dialog v-model="dialog1" max-width="600">
                                <AddClass></AddClass>
                            </v-dialog>
                        </v-card>
                    </v-row>
                <!-- </v-container>

                <v-container> -->
                    <v-row >
                        <v-card hover class="mx-auto" max-width="400"    @click.stop="dialog2 = true" > 
                            <v-img
                                src="..//icons//download.png"
                                height="200px"
                                ></v-img>
                            <v-card-title color="primary" class="headline">View Analysis</v-card-title>
                            <v-card-subtitle>Track what, which and when the student was absent. Graphs and Tables make this easier to understand </v-card-subtitle>
                            <v-dialog v-model="dialog2" max-width="600">
                                <Visualize></Visualize>
                            </v-dialog>
                        </v-card>
                        
                    </v-row>
                </v-container>
           
            </v-container>   
            </v-img> 
        </v-content>

        <!-- <v-footer app  color="primary">
        <span class="white--text">&copy; Made by Sameer, Piyush, Pratik, Mihir</span>
        </v-footer> -->
    </v-app>
</template>

<script>
    import AddClass from "..//components//AddClass.vue";
    import Visualize from "..//components//Visualize.vue";
    export default {
        props: {
            source: String,
        },
        name:'ProfessorPortal',
        pageTitle: 'My Profile',
        components:{
            'AddClass':AddClass,
            'Visualize':Visualize,
            // 'Home':Home
        },
        methods:{
            test:function(i){
                this.id=i;

                console.log(i,this.id);

            },
            
        },
        data(){
            return{
                id:5,
                drawer: null,
                absolute: true,
                worksheet:'',
                clipped: false,
                loading: false,
                dialog1: false,dialog2: false,
                notifications: false,
                sound: true,
                widgets: false,
                form: {
                        firstName: 'Satish',
                        lastName: 'Ket',
                        contactEmail: 'satish.ket@mctrgit.ac.in',
                        department:'Computer Engineering',
                        contactPhone:'+919800077777',

                    },
                icons: ['mdi-play'],
                items: [
                    {
                    title: 'Add New Class',
                    img: './/icons//download.jpg',
                    },
                    {
                    title: 'View Attendance Analytics',
                    img: './/icons//download.jpg',
                    },
                    {
                    title: 'Mellow Moods',
                    img: './/icons//download.jpg',
                    },
                ],

            }
       },

        
    }
</script>
×
Drag and Drop
The image will be downloaded