<template>
	<div>
		<div>
            <!--Snack Bar-->
            <v-snackbar
                v-model="snackbar"
                :right="x === 'right'"
                :timeout="timeout"
                auto-height
                :color="colorSnackbar"
                >
                {{ text }}
                <v-btn
                    color="white"
                    flat
                    @click="snackbar = false"
                >
                    <v-icon>{{ typeSnack }}</v-icon>
                </v-btn>
            </v-snackbar>
			<v-layout row wrap>
				<vue-particles
	              class="home-partical"
	              color="#dedede"
	              :particleOpacity="0.6"
	              :particlesNumber="80"
	              shapeType="circle"
	              :particleSize="3"
	              linesColor="#dedede"
	              :linesWidth="1"
	              :lineLinked="true"
	              :lineOpacity="0.4"
	              :linesDistance="150"
	              :moveSpeed="3"
	              :hoverEffect="true"
	              hoverMode="grab"
	              :clickEffect="true"
	              clickMode="repulse"
	            ></vue-particles>
			</v-layout>
		</div>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-card
                    class="mx-auto"
                    width="400" 
                    
                >
                <template v-if="showProgress">
                    <v-progress-linear :indeterminate="true" style="margin: 0 !important;"></v-progress-linear>
                </template>
                <!--Khong co tai khoan va dang nhap bt-->
                    <div v-if="normalLogin" >
                        <v-layout
                            align-center
                            justify-space-around
                            wrap
                            style="padding: 20px 0"
                        >
                            <v-flex md12 class="text-xs-center">
                                <h6 class="green--text">Mini Library</h6>
                            </v-flex>
                            <!-- <v-flex md12 class="text-xs-center">
                                <h5>Dang nhap</h5>
                            </v-flex> -->
                        </v-layout>
                        <v-tabs
                            dark
                            color="white"
                        >
                            <v-tabs-slider color="green"></v-tabs-slider>

                            <v-tab href="#tab-1" style="width: 50%;" class="green--text">
                            Đăng nhập
                            </v-tab>

                            <v-tab href="#tab-2" style="width: 50%;" class="green--text">
                            Đăng ký 
                            </v-tab>

                            <v-tab-item
                            id="tab-1"
                            >
                            <v-card flat>
                                <v-card-text>
                                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
                                        <v-text-field 
                                            prepend-icon="person" 
                                            name="email"
                                            v-model="email" 
                                            label="Nhập email" 
                                            type="text"
                                            :rules="emailRules"
                                            required
                                            color="green"
                                        ></v-text-field>
                                        <v-text-field 
                                            prepend-icon="lock" 
                                            name="password"
                                            v-model="password" 
                                            label="Nhập mật khẩu" 
                                            type="password"
                                            :rules="passRules"
                                            
                                            required
                                            color="green"
                                        ></v-text-field>
                                        <v-card-actions>
                                            <v-btn 
                                                type="submit"
                                                :loading="loading"
                                                color="green" class="white--text" round :disabled="!valid"  style="width: 100%;"> Đăng nhập</v-btn>
                                        </v-card-actions>
                                    </v-form>
                                </v-card-text>
                                
                            </v-card>
                            </v-tab-item>
                            <v-tab-item
                            id="tab-2"
                            >
                            <v-card flat>
                                <v-card-text>
                                    <v-form ref="form1" v-model="valid1" lazy-validation @submit.prevent="signUp">
                                            <v-text-field 
                                                prepend-icon="person" 
                                                name="name"
                                                v-model="name" 
                                                label="Nhập tên" 
                                                type="text"
                                                :rules="nameRules"
                                                required
                                                color="green"
                                            ></v-text-field>
                                            <v-text-field 
                                                prepend-icon="person" 
                                                name="email1"
                                                v-model="email1" 
                                                label="Nhập email" 
                                                type="text"
                                                :rules="emailRules"
                                                required
                                                color="green"
                                            ></v-text-field>
                                            <v-text-field 
                                                prepend-icon="lock" 
                                                name="password1"
                                                v-model="password1" 
                                                label="Enter your password" 
                                                type="password"
                                                :rules="passRules"
                                                :counter="15"
                                                required
                                                color="green"
                                            ></v-text-field>
                                            <v-card-actions>
                                    <v-btn 
                                        type="submit"
                                        :loading="loading1"
                                        color="green" class="white--text" round :disabled="!valid1" style="width: 100%;"> Đăng ký</v-btn>
                                </v-card-actions>
                                        </v-form>
                                    </v-card-text>
                                    
                            </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </div>
                <!--Da co tai khoan-->
                    <div v-if="loginAccount">
                        <v-layout
                            align-center
                            justify-space-around
                            wrap
                            style="padding: 20px 0"
                        >
                            <v-flex md12 class="text-xs-center">
                                <h6 class="green--text">Mini Library</h6>
                            </v-flex>
                            <v-flex md12 class="text-xs-center">
                                <h5 class="green--text darken-2"> Chọn tài khoản</h5>
                            </v-flex>
                        </v-layout>
                        <v-list two-line>
                            <template v-for="(account, index) in accounts">
                                <v-list-tile
                                    :key="index"
                                    avatar
                                    @click="chooseAccount(index)"
                                    >
                                    <v-list-tile-avatar color="red">
                                        <span class="white--text headline">{{ account.image }}</span>
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="account.name"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="account.email"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                            <v-list-tile @click="diffAccount">
                                <v-list-tile-avatar color="grey">
                                    <span class="white--text headline">K</span>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>Chọn tài khoản khác</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-divider></v-divider>
                            <v-list-tile @click="preDelete">
                                <v-list-tile-avatar color="white">
                                    <span class="white--text headline">X</span>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>Xóa tài khoản </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </div>
                <!-- Xoa tai khoan -->
                    <div v-if="deleteAccount">
                        <v-layout
                            align-center
                            justify-space-around
                            wrap
                            style="padding: 20px 0"
                        >
                            <v-flex md12 class="text-xs-center">
                                <h6 class="green--text">Mini Library</h6>
                            </v-flex>
                            <v-flex md12 class="text-xs-center">
                                <h5 class="green--text darken-2"> Xóa tài khoản</h5>
                            </v-flex>
                        </v-layout>
                        <v-list two-line>
                            <template v-for="(account, index) in accounts">
                                <v-list-tile
                                    :key="index"
                                    avatar
                                    >
                                    <v-list-tile-avatar color="red">
                                        <span class="white--text headline">{{ account.image }}</span>
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="account.name"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="account.email"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-icon @click="deleteAcc(index)">clear</v-icon>
                                </v-list-tile>
                            </template>
                            
                            <v-divider></v-divider>
                            <v-list-tile @click="doneAcc()">
                                <v-list-tile-avatar color="white">
                                    <span class="white--text headline">X</span>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>Hoàn thành </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </div>
                <!--Da co tai khoan va da chon-->
                    <div v-if="accountClicked">
                        <v-layout
                            align-center
                            justify-space-around
                            wrap
                            style="padding: 20px 0"
                        >
                            <v-flex md12 class="text-xs-center">
                                <h6 class="green--text">Mini Library</h6>
                            </v-flex>
                            <v-flex md12 class="text-xs-center">
                                <h5 class="green--text">{{ account.name }}</h5>
                            </v-flex>
                            <v-btn small @click="getDiffAccount" round dark color="white" class="black--text" style="text-transform: lowercase;">
                                {{ account.email }} <v-icon>keyboard_arrow_down</v-icon>
                            </v-btn>
                        </v-layout>
                        <v-card flat>
                            <v-card-text>
                                <v-form ref="form2" v-model="valid2" lazy-validation @submit.prevent="loginAccoutn">
                                    <v-text-field 
                                        prepend-icon="lock" 
                                        name="password2"
                                        v-model="password2" 
                                        label="Nhập mật khẩu" 
                                        type="password"
                                        autofocus
                                        :rules="pass2Rules"
                                        required
                                        color="green"
                                    ></v-text-field>
                                    <v-card-actions>
                                        <v-btn dark @click.native="dialog = true" flat small color="white" class="green--text">Quên mật khẩu</v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn 
                                            type="submit"
                                            :loading="loading2"
                                            color="green" 
                                            class="white--text" 
                                            round 
                                            :disabled="!valid2" 
                                        > Tiếp tục
                                        </v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-card-text>
                            
                        </v-card>
                    </div>
                </v-card>
            </v-layout>
        </v-container>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="350">
                <v-card>
                    <v-card-title class="headline">Lấy lại mật khẩu</v-card-title>
                    <v-card-text>
                        <v-form ref="form3" v-model="valid3" lazy-validation @submit.prevent="resetSubmit">
                            <v-text-field 
                                prepend-icon="phone" 
                                name="phone"
                                v-model="phone" 
                                label="Nhập so dien thoai" 
                                type="text"
                                autofocus
                                :rules="phoneRules"
                                required
                                color="green"
                            ></v-text-field>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" flat @click.native="dialog = false">Cancel</v-btn>
                                <v-btn color="green darken-1" type="submit" :disabled="!valid3" :loading="loading3" flat >Reset</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                    
                </v-card>
            </v-dialog>
        </v-layout>
	</div>
</template>

<script>
//import 'clientjs';
if (process.browser) {
    window.App = null;
    require('clientjs');
}



import axios from 'axios'
export default {
	name: 'Login',
	data () {
		return {
            dialog: false,
            clientUnique: {},
            valid: false,
            valid1: false,
            valid2: false,
            valid3: false,
            password: '',
            password1: '',
            password2: '',
            name: '',
            phone: '',
            phoneRules: [
                v => !!v || 'Vui lòng nhập số điện thoại',
            ],
            nameRules: [
                v => !!v || 'Vui lòng nhập tên của bạn',
            ],
            passRules: [
                v => !!v || 'Vui lòng nhập mật khẩu',
                v => v.length <= 15 || 'Mật khẩu phải ít hơn 15 kí tự '
            ],
            pass2Rules: [
                v => !!v || 'Vui lòng nhập mật khẩu',
                v => v.length <= 15 || 'Mật khẩu phải ít hơn 15 kí tự '
            ],
            email: '',
            email1: '',
            emailRules: [
                v => !!v || 'Vui lòng nhập email',
                v => /.+@.+/.test(v) || 'E-mail không đúng định dạng'
            ],
            snackbar: false,
            x: 'right',
            timeout: 6000,
            text: 'sssssssssssssssssss',
            colorSnackbar: '',
            typeSnack: 'check_circle',
            showImg: false,
            showIcon: true,
            loader: null,
            loading: false,
            loading1: false,
            loading2: false,
            loading3: false,
            normalLogin: true,
            loginAccount: false,
            deleteAccount: false,
            accounts: [],
            account: {},
            accountClicked: false,
            showProgress: false
		}
    },
    mounted() {
        window.App = this
        this.getClientIds()
        this.checkLogin()
        this.getAccountByClientId()        
    },
    methods: {
        diffAccount() {
            this.accountClicked  = false
            this.loginAccount  = false
            this.normalLogin = true   
        },
        getDiffAccount() {
            this.accountClicked  = false
            this.loginAccount  = true
            this.normalLogin = false
        },
        getAccountByClientId() {
            axios.post("/api/getAccountByClientId", {
                clientId: this.clientUnique.clientId
            }).then(response => {
                if (response.data[0]) {
                    //console.log(response.data[0])
                    this.accounts = response.data;
                    this.normalLogin = false
                    this.loginAccount = true
                }
            }).catch(err => {
                console.log(err.response)
            })
        },
        submit () {
            if (this.$refs.form.validate()) {
                this.loader = 'loading'
                const l = this.loader
                this[l] = !this[l]
                
                axios.post("/api/users/login", {
                    password: this.password,
                    email: this.email,
                    clientId: this.clientUnique.clientId,
                    clientUnique: this.clientUnique
                }).then(response => {
                    if (response.data.stt == true) {
                        axios.get("/api/sessionStatus").then(response => {
                            this.$store.dispatch('login', {
                                email: response.data.email,
                                name: response.data.name,
                                avatar: response.data.avatar
                            }).then(res => {
                                if (window.linkRedirect) {
                                    this.$router.push({name: window.linkRedirect});
                                } else {
                                    this.$router.push('/');
                                }
                                
                            }) 
                        })
                    } else {
                        this.snackbar =  true
                        this.text = response.data.msg
                        this.colorSnackbar = 'red'
                        this.typeSnack = 'cancel'
                    } 
                }).catch(function (error) {
                    console.log(error.response)
                    let errors = error.response;
                }).finally(callback => {
                    this.loader = null 
                    this.loading = false
                })   
            } else {
                this.loader = null 
                const l = this.loader
                this[l] = !this[l]
            }
        },
        signUp () {
            if (this.$refs.form1.validate()) {
                this.loader = 'loading1'
                const l = this.loader
                this[l] = !this[l]
                

                axios.post("/api/users/register", {
                    name: this.name,
                    email: this.email1,
                    password: this.password1,
                    clientId: this.clientUnique.clientId,
                    OS: this.clientUnique.OS,
                    browser: this.clientUnique.browser,
                    image: this.name.charAt(0),
                    clientUnique: this.clientUnique

                }).then(response => {
                    console.log(response)
                    if (response.data.stt == true) {
                        axios.get("/api/sessionStatus").then(response => {
                            console.log(response)
                            if (response.data) {
                                this.$store.dispatch('login', {
                                    email: response.data.email,
                                    name: response.data.name,
                                    avatar: response.data.avatar
                                }).then(res => {
                                    this.$router.push('/users/account');
                                })
                            }
                            
                        }).catch(err => {
                            console.log(err.response)
                        })
                    } else {
                        this.snackbar =  true
                        this.text = response.data.msg
                        this.colorSnackbar = 'red'
                        this.typeSnack = 'cancel'
                    }
                }).catch(function (error) {
                    console.log(error.response)
                    let errors = error.response;
                }).finally(callback => {
                    this.loader = null
                    this.loading1 = false
                })
            } else {
                this.loader = null 
                const l = this.loader
                this[l] = !this[l]
            }
        },
        loginAccoutn() {
            if (this.$refs.form2.validate()) {
                this.loader = 'loading2'
                const l = this.loader
                this[l] = !this[l]
                axios.post("/api/users/login", {
                    password: this.password2,
                    email: this.account.email,
                    clientId: this.clientUnique.clientId,
                    clientUnique: this.clientUnique
                }).then(response => {
                    if (response.data.stt == true) {
                        axios.get("/api/sessionStatus").then(response => {
                            this.$store.dispatch('login', {
                                email: response.data.email,
                                name: response.data.name,
                                avatar: response.data.avatar
                            }).then(res => {
                                if (window.linkRedirect) {
                                    this.$router.push({name: window.linkRedirect});
                                } else {
                                    this.$router.push('/');
                                }
                            })
                            
                        })
                    } else {
                        this.snackbar = true
                        this.text = response.data.msg
                        this.colorSnackbar = 'red' 
                        this.typeSnack = 'cancel'
                    }
                }).catch(function (error) {
                    console.log(error.response)
                    let errors = error.response;
                }).finally(callback => {
                    this.loader = null
                    this.loading2 = false
                })
            } else {
                this.loader = null 
                const l = this.loader
                this[l] = !this[l]
            }
        },
        chooseAccount(index) {
            this.showProgress = true
            //console.log(this.accounts[index]);
            this.loginAccount  = false
            this.normalLogin = false
            this.accountClicked  = true
            this.account = this.accounts[index]
            this.showProgress = false
        },
        getClientIds() {
            let client = new ClientJS();
            this.clientUnique = {
                browser: client.getBrowser(),
                clientId: client.getFingerprint(),
                OS: client.getOS()
            }
            console.log(this.clientUnique)
        },
        preDelete() {
            this.loginAccount  = false
            this.normalLogin = false
            this.accountClicked  = false
            this.deleteAccount = true
        },
        deleteAcc(index) {
            console.log(this.accounts[index])
            let email = this.accounts[index].email
            axios.post('/api/users/deleteAccount', {email: email, clientId: this.clientUnique.clientId}).then(response => {
                console.log(response.data)
                if (response.data.length > 0) {
                    this.accounts = response.data;
                    this.loginAccount  = false
                    this.accountClicked  = false
                    this.deleteAccount = true
                    this.normalLogin = false
                } else {
                    this.loginAccount  = false
                    this.accountClicked  = false
                    this.deleteAccount = false
                    this.normalLogin = true
                }
            }).catch(err => {
                console.log(err.response)
            })
        },
        doneAcc() {
            if (this.accounts.length > 0) {
                this.loginAccount  = true
                this.accountClicked  = false
                this.deleteAccount = false
                this.normalLogin = false
            } else {
                this.loginAccount  = false
                this.accountClicked  = false
                this.deleteAccount = false
                this.normalLogin = true
            }
        },
        resetSubmit() {
            if (this.$refs.form3.validate()) {
                this.loader = 'loading3'
                const l = this.loader
                this[l] = !this[l]
                ////this.loader = null
                //this.loading3 = false
            }
        }
    }
    
}
</script>
<style scoped>
    .theme--light.v-card {
       background-color: none !important; 
    }
    .v-tabs__bar {
        background-color: none !important;
    }
</style>