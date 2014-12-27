function initEditor(callback,data){
	data=data||{};
	addCSS([
		{href:'lib/CodeMirror/lib/codemirror.css'},
		{href:'mylib/CodeMirror/fold.css'},
		{href:'mylib/CodeMirror/search.css'},
	]);
	addScript([
		{src:'lib/CodeMirror/lib/codemirror.js'},
		{src:'lib/CodeMirror/mode/javascript/javascript.js'},
		{src:'lib/CodeMirror/addon/comment/continuecomment.js'},
		{src:'lib/CodeMirror/addon/edit/matchbrackets.js'},
		{src:'lib/CodeMirror/addon/edit/closebrackets.js'},
		{src:'lib/CodeMirror/addon/fold/foldcode.js'},
		{src:'lib/CodeMirror/addon/fold/foldgutter.js'},
		{src:'lib/CodeMirror/addon/fold/brace-fold.js'},
		{src:'lib/CodeMirror/addon/fold/comment-fold.js'},
		{src:'lib/CodeMirror/addon/search/match-highlighter.js'},
		{src:'lib/CodeMirror/addon/search/searchcursor.js'},
		{src:'lib/CodeMirror/addon/selection/active-line.js'},
		{src:'mylib/CodeMirror/search.js'},
	],function(){
		CodeMirror.keyMap.vm={'fallthrough':'default'};
		if(data.save) {
			CodeMirror.keyMap.vm['Ctrl-S']='save';
			CodeMirror.commands.save=data.save;
		}
		if(data.exit) {
			CodeMirror.keyMap.vm['Esc']='exit';
			CodeMirror.commands.exit=data.exit;
		}
		var T=CodeMirror(document.getElementById('eCode'),{
			continueComments:true,
			matchBrackets:true,
			autoCloseBrackets:true,
			highlightSelectionMatches:true,
			lineNumbers:true,
			mode:'javascript',
			lineWrapping:true,
			indentUnit:4,
			indentWithTabs:true,
			keyMap:'vm',
			styleActiveLine:true,
			foldGutter:true,
			gutters:['CodeMirror-linenumbers','CodeMirror-foldgutter'],
		});
		T.clearHistory=function(){T.getDoc().clearHistory();};
		T.setValueAndFocus=function(v){T.setValue(v);T.focus();};
		if(data.onchange) T.on('change',data.onchange);
		if(data.readonly) T.setOption('readOnly',data.readonly);
		callback(T);
	});
}
