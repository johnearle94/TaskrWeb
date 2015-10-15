var React = require('react/addons');
var LoginContainer = require('./LoginContainer');
var RegisterContainer = require('./RegisterContainer');
var DashboardContainer = require('./DashboardContainer');
var NewQuestContainer = require('./NewQuestContainer');
var NewTaskContainer = require('./NewTaskContainer');
var QuestsContainer = require('./QuestsContainer');
var TasksContainer = require('./TasksContainer');

var MasterContainer = React.createClass({displayName: "MasterContainer",
	updateAppState: function(__state) {
		this.setState({ appState: __state });
	},
	addTaskToQuest: function(__id) {
		this.setState({ appState: 'new_task',
						questId: __id });
	},
	updateQuest: function(__id) {
		this.setState({ appState: 'tasks',
						questId: __id });
	},
	getInitialState: function() {
		return {	user: null,
					appState: 'home',
					questId: null	};
	},
	setUser: function(__uid) {
		var self = this;
	    var ref = this.ref;
	    ref = new Firebase('https://taskrweb.firebaseio.com/');

	    var usersRef = ref.child("users");
	    var userRef = usersRef.child(__uid);

	    userRef.on("value", function(snapshot) {
	      	self.setState({ user: snapshot.val(),
	      					uid: __uid });
	      	self.updateAppState('home');
	    });
	},
	render: function() {
		switch(this.state.appState) {
		    case 'home':
		        return React.createElement(DashboardContainer, {user: this.state.user, updateAppState: this.updateAppState, updateQuest: this.updateQuest, uid: this.state.uid})
		        break;
		    case 'login':
		        return React.createElement(LoginContainer, {setUser: this.setUser, updateAppState: this.updateAppState})
		        break;
		    case 'register':
		        return React.createElement(RegisterContainer, null)
		        break;
		    case 'new_quest':
		        return React.createElement(NewQuestContainer, {uid: this.state.uid, updateQuest: this.updateQuest})
		        break;
		    case 'new_task':
		        return React.createElement(NewTaskContainer, {uid: this.state.uid, questId: this.state.questId})
		        break;
		    case 'tasks':
		    	return React.createElement(TasksContainer, {uid: this.state.uid, questId: this.state.questId, addTaskToQuest: this.addTaskToQuest})
		    	break;
		   	case 'quests':
		        return React.createElement(QuestsContainer, {uid: this.state.uid, questId: this.state.questId, updateQuest: this.updateQuest, updateAppState: this.updateAppState})
		        break;
		    default:
		        return React.createElement("div", null, "rendering error")
		}
	}
});

React.render(React.createElement(MasterContainer, null), document.body);