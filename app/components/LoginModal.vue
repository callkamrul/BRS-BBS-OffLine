<template>
<div>
	<div id="login-modal" class="ui small modal">
		<i class="close icon"></i>
		<div class="header">
			Login BRS_BBS
		</div>
		<div class="content">

			
			<form class="ui form">
  <div class="field two ">
    <label>User Name</label>
	<div class="two fields">
		<div class="field">
    <input type="text" name="first-name" placeholder="Username">
		</div>
	</div>
  </div>
  <div class="field ">
    <label>Password</label>
	<div class="two fields">
		<div class="field">
    <input type="password" name="last-name" placeholder="Password">
		</div>
	</div>
  </div>
  
  <button type="button" @click="authenticate" class="ui primary button">Login</button>
  <button type="button" class="ui secondary button" @click="loginClose">Cancel</button>
</form>

				
		
		</div>

	</div>
		
</div>	
</template>

<script>
import Vue from 'vue';

import store from '../store'
import eventHub from '../shared/EventHub';

export default {
	data(){
		return {
			
		}
	},

	methods:{
		authenticate () {
        	
			$('#login-modal').modal('hide');
		},
		loginClose (){
			$('#login-modal').modal('hide');
		},
		loginForm:function(){
			
			$('#login-modal').modal('show');
			
		}
	},

	mounted:function(){
		eventHub.$on('login-form', this.loginForm);
		
	},
	beforeDestroy:function(){
		eventHub.$off('login-form', this.loginForm);
	}
}
</script>
