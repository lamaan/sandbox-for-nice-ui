
function Task(){	
	var self=this;
	self.done=ko.observable(false);
	self.name=ko.observable('');
	self.active=ko.observable(false);
	self.removeButtonVisible=ko.computed(function(){
		return(self.active() && !self.removed());
	});
	self.removed=ko.observable(false);
	self.itemClass=ko.computed(function(){
		if(self.removed()) return "removedItem";
		if(self.done()) return "doneItem";
		return "incompleteItem";
	});
}

function TodoListViewModel(){
	var self=this;
	self.todos = ko.observableArray();
	self.currentTask=ko.observable(new Task());
	self.currentTaskIndex=ko.observable(null);	
	self.incompleteTaskCount = function(){
		var incompleteTasks = 0;
		for(var t=0;t<self.todos().length;t++){
			var task = self.todos()[t];
			if(!task.done() && !task.removed()){
				incompleteTasks++;
			}
		}
		return incompleteTasks;
	}
	self.leftTotal = function(){
		var incompleteTasks = self.incompleteTaskCount();
		if(incompleteTasks==0){
			return "0 items left";
		}
		if(incompleteTasks==1){
			return "1 item left";
		}
		if(incompleteTasks>1){
			return ""+incompleteTasks+" items left";
		}	
	}
	self.allCompletedChecked = ko.observable();
	self.allCompletedToggle = function(){
		for(var t=0;t<self.todos().length;t++){
			var task = self.todos()[t];
			task.done(self.allCompletedChecked()); 			
		}		
		return true;
	}
	self.taskDone = function(task){
		task.done(true);
		self.allCompletedChecked(self.incompleteTaskCount()==0);
	}
	self.clearCurrentTask = function(){
		self.currentTask(new Task());		
		self.currentTaskIndex(null);			
	}
	self.saveTask = function(){
		self.currentTask().name($.trim(self.currentTask().name()));
		if(self.currentTaskIndex()=== null){			
			if(self.currentTask().name()!='')
			{
				self.todos.push(self.currentTask());				
				self.clearCurrentTask();
			}
		}else{
				if(self.currentTask().name()!=''){
					var taskToUpdate = self.todos()[self.currentTaskIndex()];
					taskToUpdate.name(self.currentTask().name());				
				}else{
					self.todos.remove(self.todos()[self.currentTaskIndex()]);
				}
				self.clearCurrentTask();
		}
	}
	self.currentTaskKeyup = function(event,code){
		if(code.which===27){
			self.clearCurrentTask();		
		}
		if(code.which===13){
			self.saveTask();
		}
		return true;
		//debugger;
	};
	
	self.toggleActive = function(task){
		task.active(!task.active());
		return true;
	}
	self.removeTask = function(task){
		task.removed(true);		
	}
	self.editTask = function(task){
		self.currentTaskIndex(self.todos.indexOf(task));
		self.currentTask(new Task());
		self.currentTask().name(task.name());
	}
}