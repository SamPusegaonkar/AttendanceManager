<template>
	<v-card class="mx-auto" max-width="600">
		<v-toolbar dark color="red">
			<v-btn icon dark  @click="dialog1 = false">
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-toolbar-title>Add a new class</v-toolbar-title>
			<v-spacer></v-spacer>
			
		</v-toolbar>
		<v-card-title class="title font-weight-regular justify-space-between">
			<span>{{ currentTitle }}</span>
			<v-avatar color="red lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
		</v-card-title>

		<v-window v-model="step">
			<v-window-item :value="1">
				<v-card-text>
				<v-text-field v-model="email" label="Email" type="text" :rules="[() => !!email || 'This field is required']" :error-messages="errorMessages"></v-text-field>
				<span class="caption grey--text text--darken-1">
					This email will help you to access your attendance
				</span>
				</v-card-text>
			</v-window-item>

			<v-window-item :value="2">
				<v-card-text>
				<v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"	offset-y min-width="290px">
					<template v-slot:activator="{ on }">
						<v-text-field
							v-model="date"
							label="Date"
							readonly
							v-on="on"
						></v-text-field>
					</template>
					<v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
				</v-menu>

				<v-select v-model="div" :items="items" :rules="[v => !!v || 'Item is required']" label="Div" required></v-select>
				<v-text-field
					v-model="subject"
					label="Subject"
					type="text"
				></v-text-field>
				
				<span class="caption grey--text text--darken-1">
					Please add all details 
				</span>
				</v-card-text>
			</v-window-item>

			<v-window-item :value="3">
				<div class="pa-4 text-center"> 

					<v-container>
						<v-row>
							<v-col cols="12" sm="6">
							<v-text-field
								v-model="student_name"
								label="Student Name"
								outlined
								readonly
							></v-text-field>
							</v-col>
							
							<v-col cols="12" sm="6">
							<v-text-field
								v-model="student_rollno"
								label="RollNo"
								outlined
								readonly
							></v-text-field>
							</v-col>
						
						</v-row>
						</v-container>
					<StreamBarcodeReader
						@decode="onDecode"
						@loaded="onLoaded"
					></StreamBarcodeReader>
				</div>
			</v-window-item>

			<v-window-item :value="4">
				<v-card-text>
				<span class="caption grey--text text--darken-1">
					Attendance once marked cannot be changed!
				</span>
				</v-card-text>
			</v-window-item>
		</v-window>

		<v-divider></v-divider>

		<v-card-actions>
			<v-btn :disabled="step === 1" text @click="step--">
				Back
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn color="red" v-if="this.step == 4" depressed @click='sendData' >
				Done
			</v-btn>
			<v-btn color="red" v-if="this.step !=4" depressed @click="step++" >
				Next
			</v-btn>
			
		</v-card-actions>
  </v-card>
</template>

<script>

import { StreamBarcodeReader } from "vue-barcode-reader";
import axios from 'axios';

export default {
	
	name:'ScanQR',
	components:{
		StreamBarcodeReader
	},
    watch: {
		Email () {
		this.errorMessages = ''
		},
	},
    data(){
      return{

		step: 1,
		data_save:[],
		dailog:false,
        student_name:'',
        student_rollno:'',
        student_excel:'',
        student_id:'',
        student_div:'',
        email:'',
        date: new Date().toISOString().substr(0, 10),
        select:'',
		subject:'',
		ids:[],
        menu: false,
        modal: false,
        menu2: false,
        drawer: true,
        time: '11:15',
		div:'',
        items: [
        'A',
        'B'
        ],
        clipped: false,
        loading: false,
        form: {
                firstName: 'John',
                lastName: 'Doe',
                contactEmail: 'john@doe.com',
                avatar: 'MALE_CAUCASIAN_BLOND_BEARD',
                department: 'Computer'
                },
        
      }
    },
    computed: {
      currentTitle () {
		console.log(this.step);
        switch (this.step) {
			case 1: return 'Enter your email'
			case 2: return 'Enter class details'
			case 3: return 'Please allow students to scan their IDs'
			default: return "Are you sure you want to submit today's attendance?"
        }
      },
    },
    methods: {
		async onDecode (result) {
		this.data_save={email:this.email, subject:this.subject, div:this.div, date:this.date,attendance:{}};

		console.log(result);
		axios.post('http://localhost:3001/',{
			data:{id:result}
			})
			.then(response=>{
			this.student_name=response.data.name
			this.student_rollno=response.data.rollno
			this.student_id=response.data.id
			this.ids.push(this.student_id)
			this.student_div=response.data.div
			console.log(this.student_id)
			}).catch(error =>{
			console.log(error);
			console.log('ERROR::',error.response.body)
			});console.log("success");
		
		},
		sendData: function(){
			console.log(this.data_save)
						this.data_save.attendance[this.student_id]=1
			var i;
			for(i=0;i<this.ids.length;i++){
				this.data_save.attendance[this.ids[i]]=1
			}
			axios.post('http://localhost:3003/',{
				data:this.data_save
			})
			.then(response=>{console.log(response.data)
			
			}).catch(error =>{
				console.log(error);
				console.log('ERROR::',error.response.body)
			});
		}
	}
}

</script>

<style scoped></style>