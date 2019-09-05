>General Information

Currently Supported Pools that are Mined from

-NLPool
-ZPool
-BlockMasters *

A * denotes that the pool is currently being tested for efficiency

-------------------------------------------------------------------

Current Miner Versions
MultiPoolMiner-3.4.6 Start Dev - 8/21/19
MultiPoolMiner-3.5.2 8/22/19 - Current
_____________________________________________________________________________________________________________
-------------------------------------------------------------------------------------------------------------
_____________________________________________________________________________________________________________
>Config File
This section is for more experienced users of crypto miner's.
If the config file is not correct, the program will most likely not work.
Please only change the config file if you know how to.

The Charity Coin config file currently has 6 features.

1) GPU Usage Control:

This feature is currently not working, but in the future you will be able to limit the crypto miner's GPU usage.
This is done by replacing the default (50) with a number (1-100). 
Please note that numbers under 20 will be contributing almost no computing power towards mining.

========================================================================================================

2) GUI Theme:
Themes are stored in the "themes.ccf" file with the format shown below.
*Theme Name* = (*background rgb code*):(*foreground rgb code*)

The file starts with the themes "LIGHT", and "DARK". More themes can be added by using the format on the next avaliable line.

Example theme:
ORANGEBLUE = (255,125,0):(0,0,255)

To set the current theme, replace the current theme in "config.ccf" on the line that starts with "%THEME%" with the desired Theme Name from "themes.ccf".
Example config:
%THEME% = ORANGEBLUE

========================================================================================================

3) Mined Amount (Not yet implemented. Numbers that appear on the screen are estimates):
This is to store the amount of money you donated when you close the program. 
Editing this will not increase your actual donations. 
It is just there to let you know how much you have mined.

========================================================================================================

4) Wallet Address:
This controls what address the crypto currency is mined to.
In the future this will not be needed, as the program will fetch the wallet address from our website.

========================================================================================================

5) GPU Toggle:
Toggle if GPU mining is enabled (TRUE) or disabled (FALSE).
This can be edited in the GUI.
========================================================================================================

6) CPU Toggle:
Toggle if CPU mining is enabled (TRUE) or disabled (FALSE).
This can be edited in the GUI.


