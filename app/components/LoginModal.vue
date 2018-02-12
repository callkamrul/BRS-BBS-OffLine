<template>
<div>
	<div id="login-modal" class="ui small modal">
		<i class="close icon"></i>
		<div class="header">
			Login BRS_BBS
		</div>
		<div class="content">

			
			 asdfadsfadsfadsfsadfdsf adsf
       fasdf adsfasdf  

				<div class="">
					<button type="button" @click="authenticate" class="ui purple inverted button">Login</button>
				</div>
		
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
