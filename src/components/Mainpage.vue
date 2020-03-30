
  <!-- <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  
                  <span>Source</span>
                </v-tooltip>

              </v-toolbar>

              <v-card-text>
                
                <v-form>
                  <v-radio-group v-model="row" row>
                  <v-radio label="Admin" value="Admin"></v-radio>
                  <v-radio label="Professor" value="Professor"></v-radio>
                </v-radio-group>
                  
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    ref="address"
                   
                    placeholder="abc@mctrgit.ac.in"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app> -->
  <template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field 
            label="Username" 
            prepend-icon="mdi-account-circle"
          />
          <v-text-field 
            :type="showPassword ? 'text' : 'password'" 
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success">Register</v-btn>
        <v-btn color="info">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>


<script>

    export default {
      name:'Mainpage',
      data () {
        return {
          radioGroup: 1,
          showPassword: false,

          methods:{
            checkCredentials:function(){
              console.log("fdsfdsfdsfdsfsdf");
              // this.$router.push('/professorportal');

              // var excel = require('excel4node');

              // var workbook = new excel.Workbook();

              // // Add Worksheets to the workbook
              // var worksheet = workbook.addWorksheet('Sheet 1');

              // // Create a reusable style
              // var style = workbook.createStyle({
              //   font: {
              //     color: '#FF0800',
              //     size: 12
              //   },
              //   numberFormat: '$#,##0.00; ($#,##0.00); -'
              // });

              // // Set value of cell A1 to 100 as a number type styled with paramaters of style
              // worksheet.cell(1,1).number(100).style(style);

              // // Set value of cell B1 to 300 as a number type styled with paramaters of style
              // worksheet.cell(1,2).number(200).style(style);

              // // Set value of cell C1 to a formula styled with paramaters of style
              // worksheet.cell(1,3).formula('A1 + B1').style(style);

              // // Set value of cell A2 to 'string' styled with paramaters of style
              // worksheet.cell(2,1).string('string').style(style);

              // // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
              // worksheet.cell(3,1).bool(true).style(style).style({font: {size: 14}});

              // workbook.write('Excel.xlsx');
              // var xlsx = require('node-xlsx');

              // var obj = xlsx.parse(__dirname + 'src\\data\\Excel\\Professor.xlsx'); // parses a file
              // console.log(obj);
            }
          }
        }
        
        }
      }
    

</script>

<style lang="scss" scoped>

        body,
        html {
            margin: 0;
            padding: 0;
            height: 100%;
            background: #60a3bc !important;
        }
        .user_card {
            height: 350px;
            width: 350px;
            margin-top: auto;
            margin-bottom: auto;
            background: #f39c12;
            position: relative;
            display: flex;
            justify-content: center;
            flex-direction: column;
            padding: 10px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            border-radius: 5px;

        }
        .brand_logo_container {
            position: absolute;
            height: 170px;
            width: 170px;
            top: -75px;
            border-radius: 50%;
            background: #60a3bc;
            padding: 10px;
            text-align: center;
        }
        .brand_logo {
            height: 150px;
            width: 150px;
            border-radius: 50%;
            border: 2px solid white;
        }
        .form_container {
            margin-top: 100px;
        }
        .login_btn {
            width: 100%;
            background: #c0392b !important;
            color: white !important;
        }
        .login_btn:focus {
            box-shadow: none !important;
            outline: 0px !important;
        }
        .login_container {
            padding: 0 2rem;
        }
        .input-group-text {
            background: #c0392b !important;
            color: white !important;
            border: 0 !important;
            border-radius: 0.25rem 0 0 0.25rem !important;
        }
        .input_user,
        .input_pass:focus {
            box-shadow: none !important;
            outline: 0px !important;
        }
        .custom-checkbox .custom-control-input:checked~.custom-control-label::before {
            background-color: #c0392b !important;
        }
</style>