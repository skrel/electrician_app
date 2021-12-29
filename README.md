# electrician_app

![Downloads](https://img.shields.io/badge/electrician-1.0.0-orange.svg)

# The need for a solution
There is a need to divide complex electrical installations into manageable subassemblies that can be prefabricated: electrical boxes for wall roughing, light fixtures, transformer wiring, overhead and underground conduits, panels, j-boxes etc. 
Creating a native component configurator application for on-site team members will help optimize proper off-site assembly and functionality. The on-site team members can put together a list of assemblies they need based on the construction condition and pass the list directly to the prefab shop. This tool can help you tie all pre-construction information together throughout the entire project, boost productivity and profitability of design and prefabrication teams.

# Download
- Android - https://play.google.com/store/apps/details?id=com.skrel.electricianapp
- iOS - 

# Support page
https://github.com/skrel/Electrician/wiki

# Who is using it
1. Electrical Contractors and Subcontractors that have prefab shops.
2. Electrical Supply Companies.
3. Electrical prefab shops.

# Previous versions
There were two versions of this app:
1. Electrical_Assembli_order_Ver1 (github link: https://github.com/skrel/Electrical_Assembly_Order_Ver1)
2. Electrical_Assembli_order_Ver2 (github link: https://github.com/skrel/Electrical_Assembli_order_Ver2)
Both (ver1 and ver2) are Android Studio projects and working only on Android devices. Generaly, they were built as screens that require data entry.
Electrical_Assembli_order_Ver2 was posted in Google Play - the app called Prefab Solutions (link: https://play.google.com/store/apps/details?id=com.configurator.android_app&hl=en_US&gl=US)
3. Electrical Assembly 

# What this is right now
React Native mobile application available for both iOS and Android platforms. The app displays data stored on an external server in a json file. Sample file - https://skrel.github.io/jsonapi/box.json . This is a newer version of the two previous versions built on a "shopping cart" principle. List of items from the cart can be emailed.

# Stack
- React Native with Expo: https://docs.expo.dev/
- Node.js + npm 
- Libs: https://reactnavigation.org/docs/getting-started/ , ...
- Expo SQLite: https://docs.expo.dev/versions/latest/sdk/sqlite/
- SVG: https://docs.expo.dev/versions/v39.0.0/sdk/svg/ , https://github.com/react-native-svg/react-native-svg

# SQLite structure (shopping cart)

```
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists cart (id integer primary key not null, image text, name text, purpose text, qty text);"
      );
    });
```

# Navigation events
https://reactnavigation.org/docs/navigation-events/
```
React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction((tx) => {
        tx.executeSql("select * from cart", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        });
      });
    });
    return unsubscribe;
  }, [navigation]);
```

# Configurator with svg

```
import * as React from 'react';
import Svg, { Circle, Rect, Line } from 'react-native-svg';

export default function SvgComponent(props) {
  return (
    <Svg height="100%" width="100%">
      <Line x1="200" y1="100" x2="200" y2="300" stroke="red" strokeWidth="2" />
      <Line x1="50" y1="100" x2="50" y2="300" stroke="red" strokeWidth="2" />
      <Line x1="50" y1="300" x2="200" y2="300" stroke="red" strokeWidth="2" />
      <Line x1="50" y1="100" x2="200" y2="100" stroke="red" strokeWidth="2" />
    </Svg>
  );
}
```

# Demo

![reactnativeapp](https://user-images.githubusercontent.com/43278778/143285036-4d262708-7299-4fcf-932d-6999b9fd667e.png)

# Paid version
(Create an app in Salesforce including a standard price book. In the mobile app add the ability to send data to Salesforce)
![Blank diagram](https://user-images.githubusercontent.com/43278778/140547299-f3be5a33-ab4c-4d48-9bad-00a661687b53.jpeg)
 
# App Feedback form
1.	How does the app run?
2.	How do you like the app design?
3.	Overall how would you rate our app? What is the reason for your score?
4.	Can you describe a situation in which our app is most useful?
5.	How much of your busyness does this solution cover (how many of those electrical assemblies are you currently using)?
6.	What type of assemblies you expected to see but didn’t find in the app?
7.	Who you think would be using the app today in your company or your partners?
8.	Which feature of the app is most important to you?
- 3D visualisation 
- Be able to work with CRM and ERP systems
9.	Which of the following features do you use least?
- Cost estimate 
- Field assembly ordering
- Automatic Spoolsheet generation
10.	Are there any functionality you would like us to add?
11.	Which features didn’t work as expected?
12.	Do you know a similar solution for Electrical, Plum or Mech contractors? If so - can you list a name.
