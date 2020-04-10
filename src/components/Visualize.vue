<template>
<v-card class="mx-auto" max-width="600">
    <v-toolbar dark color="warning">
          <v-btn icon dark>
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Calculate attendance</v-toolbar-title>
          <v-spacer></v-spacer>      
    </v-toolbar>
	<v-container id="dropdown-example">
    <v-row>
        <v-col >
			<p>Subject</p>

			<v-overflow-btn
			class="my-2"
			:items="dropdown_subjects"
			label="Select"
			v-model="subject"
			target="#dropdown-example"
			></v-overflow-btn>
		</v-col>
		<v-col >
			<p>Division</p>
			<v-overflow-btn
			class="my-2"
			:items="dropdown_div"
			label="Select"
			v-model="div"
			item-value="text"
			></v-overflow-btn>
		</v-col>
		<v-col >
			<p>Date</p>
			<v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
			<template v-slot:activator="{ on }">
			<v-text-field v-model="date" label="Date" readonly v-on="on"></v-text-field>
			</template>
			<v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
			</v-menu>
		</v-col>
		<v-col >
			<p>Format</p>
			<v-overflow-btn
			class="my-2"
			:items="dropdown_format"
			label="Select"
			v-model="format"
			item-value="text"
			></v-overflow-btn>
		</v-col>
      
    </v-row>
    <v-row align="center">
        <v-col class="text-center" >
		<v-btn raised color="warning" @click="generate()">Generate</v-btn>
          </v-col>
    </v-row>
    <v-row align="center">
        <v-col class="text-center" >
            <v-data-table  v-if="this.format =='Table'"   loading-text="Loading... Please wait" :headers="headers1" :items="rows1"  class="elevation-1"  ></v-data-table>
			<v-sheet v-else-if="this.format == 'Graph'" class="v-sheet--offset mx-auto" color="warning" elevation="12" max-width="calc(100% - 32px)">
				<v-sparkline  :labels="labels" :value="graph_value" color="white" line-width="2" padding="16"></v-sparkline>
			</v-sheet>	
        </v-col>
    </v-row>
	</v-container>
</v-card>
</template>

<script>

import axios from 'axios';

export default {
  name:'Visualize',
	data(){
		return{
			dropdown_format: ['Graph', 'Table'],
			headers1: [
			{
				text: 'Student ID',
				align: 'start',
				sortable: false,
				value: 'name',
			},
			],
			graph_value: [

			],
			labels: [
			],
			list:'',
			div:'',
			subject:'',
			format:'',
			date: new Date().toISOString().substr(0, 10),
			show:0,
			rows1:[],
			dropdown_subjects: [
			{ text: 'All Subjects'},
			{ text: 'CCL' },
			{ text: 'DBMS' },
			],
			dropdown_div: [
			{ text: 'A' },
			{ text: 'B' },

			],  
		}
	},
	
	methods:{
        generate:function(){	
        // this.show=show_item;
        console.log("Format="+this.format);
			if(this.format=='Table'){

				this.rows1=[];
				console.log(this.rows1)

				this.headers1=[];
				this.headers1.push({text: 'Student ID',align: 'start',sortable: false,value: 'name',});   
				axios.post('http://localhost:3002/',{
				data:{format:this.format,subject:this.subject,div:this.div,date:this.date}
				})
				.then(response=>{
				console.log(response.data)
				this.rows1=response.data.rows
				this.headers1.push(response.data.header[0])

				console.log(this.rows1)
				console.log(this.headers1)
				}).catch(error =>{
				console.log(error);
				console.log('ERROR::',error.response.body)
				});
			}
			else if(this.format=='Graph'){
				console.log("hello2");
				this.graph_value=[];
				this.labels=[];
				axios.post('http://localhost:3002/',{
				data:{format:this.format,subject:this.subject,div:this.div}
				}).then(response=>{
					this.graph_value=response.data.graph_value
					this.labels=response.data.labels
					console.log(this.graph_value)
					console.log(this.labels)
				}).catch(error =>{
					console.log(error);
					console.log('ERROR::',error.response.body)
				});
			}
        
	
		},
	}, 
  
  
}
</script>

<style scoped>

</style>