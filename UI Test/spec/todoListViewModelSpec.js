describe("when there are no todos", function() {    
	var todoList = new TodoListViewModel();
	it("a way to add a task should be the only component present", function() {	
        expect(todoList.todos().length).toEqual(0);
    });
});
describe("when adding a new todo", function(){
	var todoList = new TodoListViewModel();	
	todoList.currentTask().name("test");
	describe(" and enter is clicked",function(){
		todoList.saveTask();
		it("should append the task to the todo list", function(){
			expect(todoList.todos().length).toEqual(1);
		});				
	});
	describe("which has trailing spaces", function(){
		var todoList = new TodoListViewModel();	
		todoList.currentTask().name("test   ");
		describe(" and enter is clicked",function(){
			todoList.saveTask();
			it("should append the task to the todo list", function(){
				expect(todoList.todos().length).toEqual(1);
			});
			it("should remove the white space from the task", function(){
				expect(todoList.todos()[0].name()).toEqual("test");
			});			
		});
	});
	describe("which has only white space text", function(){
		var todoList = new TodoListViewModel();	
		todoList.currentTask().name("   ");
		describe(" and enter is clicked",function(){
			todoList.saveTask();
			it("should not append the task to the todo list", function(){
				expect(todoList.todos().length).toEqual(0);
			});			
		});
	});
});

describe("when an incomplete todo is in the list", function(){
	var todoList = new TodoListViewModel();	
	todoList.todos().push(new Task());
	todoList.todos()[0].name("some task");
	describe(" and the checkbox is clicked",function(){
		todoList.taskDone(todoList.todos()[0]);
		it("should mark the task as done", function(){
			expect(todoList.todos()[0].done()).toEqual(true);
		});			
	});
});
describe("when an incomplete todo is in the list", function(){
	var todoList = new TodoListViewModel();	
	todoList.todos().push(new Task());
	todoList.todos()[0].name("some task");
	describe(" and the item is double clicked",function(){
		todoList.editTask(todoList.todos()[0]);
		it("should select the edited task", function(){
			expect(todoList.currentTaskIndex()).toEqual(0);
		});
		it("should show the task text for editing", function(){
			expect(todoList.currentTask().name()).toEqual("some task");
		});				
	});
});
describe("when an incomplete todo is in the list", function(){
	var todoList = new TodoListViewModel();	
	todoList.todos().push(new Task());
	todoList.todos()[0].name("some task");	
	describe(" and the item is double clicked",function(){
		todoList.editTask(todoList.todos()[0]);
		describe(" and the text is changed", function(){
			todoList.currentTask().name("some updated task");
			describe(" and the edit loses focus", function(){
				todoList.saveTask();
				it("should update the selected task",function(){
					expect(todoList.todos()[0].name()).toEqual("some updated task");
				});
				it("should clear the selected task",function(){
					expect(todoList.currentTaskIndex()).toEqual(null);
				});
				it("should clear the editable text",function(){
					expect(todoList.currentTask().name()).toEqual('');
				});				
			});
		});
	});
});

describe("when an incomplete todo is in the list", function(){
	var todoList = new TodoListViewModel();	
	todoList.todos().push(new Task());
	todoList.todos()[0].name("some task");	
	describe(" and the item is double clicked",function(){
		todoList.editTask(todoList.todos()[0]);
		describe(" and the text is changed", function(){
			todoList.currentTask().name("some updated task");
			describe(" and escape is pressed", function(){
				todoList.clearCurrentTask();
				it("should not update the selected task",function(){
					expect(todoList.todos()[0].name()).toEqual("some task");
				});
				it("should clear the selected task",function(){
					expect(todoList.currentTaskIndex()).toEqual(null);
				});
				it("should clear the editable text",function(){
					expect(todoList.currentTask().name()).toEqual('');
				});				
			});
		});
	});
});
describe("when an incomplete todo is in the list", function(){
	var todoList = new TodoListViewModel();	
	todoList.todos().push(new Task());
	todoList.todos()[0].name("some task");	
	describe(" and the item is double clicked",function(){
		todoList.editTask(todoList.todos()[0]);
		describe(" and the text is changed", function(){
			todoList.currentTask().name("some updated task");
			describe(" and the enter is pressed", function(){
				todoList.saveTask();
				it("should update the selected task",function(){
					expect(todoList.todos()[0].name()).toEqual("some updated task");
				});
				it("should clear the selected task",function(){
					expect(todoList.currentTaskIndex()).toEqual(null);
				});
				it("should clear the editable text",function(){
					expect(todoList.currentTask().name()).toEqual('');
				});				
			});
		});
	});
});
describe("when an incomplete todo is in the list", function(){
	var todoList = new TodoListViewModel();	
	todoList.todos().push(new Task());
	todoList.todos()[0].name("some task");	
	describe(" and the item is double clicked",function(){
		todoList.editTask(todoList.todos()[0]);
		describe(" and the text is emptied", function(){
			todoList.currentTask().name("");
			describe(" and the enter is pressed", function(){
				todoList.saveTask();
				it("should remove the task",function(){
					expect(todoList.todos().length).toEqual(0);
				});
				it("should remove the selected task",function(){
					expect(todoList.currentTaskIndex()).toEqual(null);
				});
				it("should clear the editable text",function(){
					expect(todoList.currentTask().name()).toEqual("");
				});
			});
		});
	});
});


describe("when an incomplete todo is in the list", function(){
	var todoList = new TodoListViewModel();	
	todoList.todos().push(new Task());
	todoList.todos()[0].name("some task");	
	describe("and hovering over the todo", function(){
		todoList.toggleActive(todoList.todos()[0]);
		it("shows the remove button", function(){
			expect(todoList.todos()[0].removeButtonVisible()).toEqual(true);
		});
	});
});

describe("when zero incomplete todos are in the list", function(){
	var todoList = new TodoListViewModel();			
	it("shows 0 items left", function(){
		expect(todoList.leftTotal()).toEqual("0 items left");
	});
});
describe("when one incomplete todo is in the list", function(){
	var todoList = new TodoListViewModel();	
	todoList.todos().push(new Task());
	todoList.todos()[0].name("some task");	
	var msg=todoList.leftTotal();
	it("shows 1 items left", function(){
		expect(msg).toEqual("1 item left");
	});
});

describe("when 3 incomplete todos are in the list", function(){
	var todoList = new TodoListViewModel();	
	todoList.todos().push(new Task());
	todoList.todos()[0].name("some task");	
	todoList.todos().push(new Task());
	todoList.todos()[1].name("some task 1");	
	todoList.todos().push(new Task());
	todoList.todos()[2].name("some task 2");
	var msg=todoList.leftTotal();
	it("shows 3 items left", function(){
		expect(msg).toEqual("3 items left");
	});
});



describe("when 3 incomplete todos are in the list", function(){
	var todoList = new TodoListViewModel();	
	todoList.todos().push(new Task());
	todoList.todos()[0].name("some task");	
	todoList.todos().push(new Task());
	todoList.todos()[1].name("some task 1");	
	todoList.todos().push(new Task());
	todoList.todos()[2].name("some task 2");
	describe("when complete all is checked",function(){	
		todoList.allCompletedChecked(true);
		todoList.allCompletedToggle();
		var msg=todoList.leftTotal();
		it("shows 0 items left", function(){
			expect(msg).toEqual("0 items left");
		});
		describe("when complete all is unchecked",function(){	
			todoList.allCompletedChecked(false);
			todoList.allCompletedToggle();
			var msg=todoList.leftTotal();
			it("shows 3 items left", function(){
				expect(msg).toEqual("3 items left");
			});
		});
	
	});	
});


