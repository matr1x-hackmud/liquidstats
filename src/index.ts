import { 
	QMainWindow, 
	QWidget, 
	QLabel, 
	FlexLayout, 
	QPushButton, 
	QIcon,
	QTextEdit	
} from '@nodegui/nodegui';
import KEKW from '../assets/KEKW.png';
import KEKWait from '../assets/KEKWait.png';

const KEKW_icon = new QIcon(KEKW);
const KEKWait_icon = new QIcon(KEKWait);


let STATS = {
	attempts:0,
	run_deaths:[
		0, // Homer 1
		0, // Bart 1
		0, // Lisa
		0, // Marge
		0, // Apu
		0, // Bart 2
		0 // Homer 2
	],
	deepest_level:0,
	missed:{
		bush_strat:0,
		css:0,
		pig_push:0
	},
	beat_game:0
}

const level_map = ["Homer 1","Bart 1","Lisa","Marge","Apu","Bart 2","Homer 2"]

function make_stats(){
	let stats_str = ""
	
	stats_str += "Stream "+new Date().toLocaleDateString()
	
	stats_str += "\n\nRUN ATTEMPTS: "+STATS.attempts
	stats_str += "\nRUN DEATHS: "
	stats_str += "\n  Homer 1: "+STATS.run_deaths[0]
	stats_str += "\n   Bart 1: "+STATS.run_deaths[1]
	stats_str += "\n     Lisa: "+STATS.run_deaths[2]
	stats_str += "\n    Marge: "+STATS.run_deaths[3]
	stats_str += "\n      Apu: "+STATS.run_deaths[4]
	stats_str += "\n   Bart 2: "+STATS.run_deaths[5]
	stats_str += "\n  Homer 2: "+STATS.run_deaths[6]
	
	let deepest = 0
	STATS.run_deaths.forEach(L => {
		if(L) deepest++
	})
	
	stats_str += "\n\nDEEPEST LEVEL: "+level_map[STATS.deepest_level]
	
	stats_str += "\nMISSED BUSH STRATS: "+STATS.missed.bush_strat
	stats_str += "\nMISSED CSS: "+STATS.missed.css
	stats_str += "\nMISSED PIG PUSHES: "+STATS.missed.pig_push
	
	stats.setText(stats_str);
}

const win = new QMainWindow();
win.setWindowTitle("LiquidWifi Stat Tracker");
win.setWindowIcon(KEKW_icon);

const centralWidget = new QWidget();
centralWidget.setObjectName("root");
const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);

const title_label = new QLabel();
title_label.setObjectName("title_label");
title_label.setText("LiquidWifi Stat Tracker");

const stats = new QTextEdit();
stats.setObjectName("stats");
stats.setFontFamily("Consolas, monospace");

const bush_strat = new QPushButton();
bush_strat.setText("MISSED BUSH STRAT");
bush_strat.setIcon(KEKW_icon)
bush_strat.addEventListener('clicked', () => {
	STATS.run_deaths[0]++
	STATS.missed.bush_strat++
	STATS.attempts++
	make_stats()
});

const missed_css = new QPushButton();
missed_css.setText("MISSED CSS");
missed_css.setIcon(KEKW_icon)
missed_css.addEventListener('clicked', () => {
	STATS.missed.css++
	make_stats()
});

const missed_pig = new QPushButton();
missed_pig.setText("MISSED PIG PUSH");
missed_pig.setIcon(KEKW_icon)
missed_pig.addEventListener('clicked', () => {
	STATS.missed.pig_push++
	make_stats()
});

// level fails
const level_deadge = [
	new QPushButton(),
	new QPushButton(),
	new QPushButton(),
	new QPushButton(),
	new QPushButton(),
	new QPushButton(),
	new QPushButton()
];

for(let i = 0; i < level_deadge.length; i++){
	level_deadge[i].setText(level_map[i].toUpperCase() )
	level_deadge[i].addEventListener('clicked', () => {
		STATS.run_deaths[i]++
		STATS.attempts++
		if(STATS.deepest_level < i) STATS.deepest_level = i
		make_stats()
	});
}

// he actually beat the fucking game for once

const game_beaten = new QPushButton()
game_beaten.setText("beat the game???");
game_beaten.setIcon(KEKWait_icon)
game_beaten.addEventListener('clicked', () => {
	STATS.deepest_level = 6
	STATS.beat_game++
	
	make_stats()
});

// add the widgets

rootLayout.addWidget(title_label);
rootLayout.addWidget(bush_strat);
rootLayout.addWidget(missed_css);
rootLayout.addWidget(missed_pig);

rootLayout.addWidget(level_deadge[0]);
rootLayout.addWidget(level_deadge[1]);
rootLayout.addWidget(level_deadge[2]);
rootLayout.addWidget(level_deadge[3]);
rootLayout.addWidget(level_deadge[4]);
rootLayout.addWidget(level_deadge[5]);
rootLayout.addWidget(level_deadge[6]);

rootLayout.addWidget(game_beaten);

rootLayout.addWidget(stats);

// zero out stats
make_stats()

win.setCentralWidget(centralWidget);
win.setStyleSheet(
  `
    #root {
      background-color: #DDDDDD;
      height: '100%';
      align-items: 'center';
      justify-content: 'center';
    }
    #title_label {
      font-size: 32px;
      font-weight: bold;
      padding: 8;
    }
  `
);

win.show();
(global as any).win = win;
