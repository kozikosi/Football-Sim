# Owner note, 6 Nov 2026 — salary-based weights (verbatim)

There was some confusion in the council about which weights you are using in the most current version of the engine. I've done a lot of salary analysis and this is what I want to save as my permanent opinion on the weights that the engine should be built around.

The format of this list is xM y z where x is my approximately and very rounded salary (in Millions) for a slightly above average player at that position, y is the position, and z is the weight i am choosing to give the player and that I would like shown to the user.

This also gives you a nice range to shoot for balance within; the salary weight based on setting the 40M QB at 1000 and my personal manipulation of the weights here and there by plus or minus 25points. I have chosen these values on my own intuition. When you build the engine, try to land the slotWinsPerOvr revealed impact somewhere around these values but you have a plus or minus 50 room for deviation.

The salary data should be saved internally as refernce but should never be displayed to the user on the app. The weights on the right should be the default values for the model weights on the Madden Rankings page and should be the goal to adjust the engine math to. The Guide page should rerank the players by importance by WINS.

Do not worry right now about building those ui features or anything the user will see. Please implement these values into the engine. Feel free to run tests but don't spend too much time on testing. The council can always run high token tests to provide you any data you want.

let me know if you have any quetions. Thank you. Appreciate you

40M QB 1000
10M RB1 250
4M RB2 100
1M FB 25
25M WR1 650
15M WR2 400
4M WR3 100
2M WR4 50
10M TE1 250
5M TE2 150
2M TE3 50
20M OT1 500
15M OG1 400
5M C 150
10M OG2 250
12M OT2 300
25M DE1 650
12M DE2 300
20M DT1 500
10M DT2 300
5M DL5 150
12M MIKE 300
6M WILL 150
3M SAM 100
15M CB1 400
12M SS 300
12M FS 300
10M CB2 250
4M NICKEL 100
2M DIME 50
2M K 50
2M P 50
