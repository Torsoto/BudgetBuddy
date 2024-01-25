# BudgetBuddy

Welcome to Budget Buddy! This is a finance management desktop application designed to help you take control of your finances easily and efficiently.

## Features
- **Graphs:** Automatically generates informative graphs of your financial data.
- **Multiple Cards:** Easily manage finances for multiple cards.
- **Colored Categories:** Categorize expenses with colored labels for quick identification.
- **Budget Goals:** Set and monitor budget goals to achieve financial milestones.
- **Export Finances and Graphs:** Easily export financial data and graphs.
- **Notifcations** Get notifcations when budget is exceeded.

## MoSCow Criteria
### Must
- **M1** | *Benutzeranmeldung und Authentifizierung* <br>
Das System muss sicherstellen, dass Benutzer sich anmelden und mit einem Passwort authentifizieren können.
- **M2** | *Einnahmen und Ausgaben verwalten* <br>
Das System muss Benutzern die Möglichkeit bieten, Einnahmen und Ausgaben hinzuzufügen, zu bearbeiten und zu löschen, um eine genaue Erfassung ihrer finanziellen Einnahmen zu ermöglichen
- **M3** | *Dashboard mit Finanzübersicht*: <br>
Das System muss ein Dashboard-Modul implementieren, das einen Überblick über Einnahmen, Ausgaben und Budget bietet.
- **M4** | *Budgetziele setzen und Fortschritt überwachen* <br>
Das System muss Benutzern ermöglichen, Budgetziele zu setzen und den Fortschritt zu überwachen.
- **M5** | *Kategorisierung von Einnahmen und Ausgaben* <br>
Das System muss Benutzern die Möglichkeit bieten, Einnahmen und Ausgaben zu kategorisieren.

### Should
- **S1** | *Benutzeroberfläche* <br>
Die Anwendung soll dem User die Möglichkeit bieten die Farben der Kategorien zu tauschen.
- **S2** | *Benachrichtigungen bei Budgetabweichungen* <br>
Benutzer sollen die Möglichkeit haben, Benachrichtigungen zu erhalten, wenn ihre Ausgaben ein festgelegtes Budget überschreiten, um proaktiv auf finanzielle Herausforderungen zu reagieren.
- **S3** | *Diagramme* <br>
Benutzer sollen die Möglichkeit haben, sich ihre Finanzen anhand von Kreis-, Balkan- und Liniendiagrammen zu visualisieren. 

### Could

- **C1** | *Mehrere Konten* <br>
Das System ermöglicht es dem Benutzer, mehrere Bankkonten/Karten hinzuzufügen.
Wenn der Benutzer mehrere Konten hat, kann er markieren, zu welchem Konto seine Einnahmen/Ausgaben gehören.
- **C2** | *Exportfunktion csv* <br>
Die Anwendung kann eine Exportfunktion bereitstellen, um Finanzdaten in gängigen csv-Format zu exportieren, die für weitere Zwecke verwendet werden können.
- **C3** | *Exportfunktion Bild* <br>
Die Anwendung kann den Export von Diagrammen in Bildformate unterstützen.



## Installation
Clone the repository:
```bash
git clone https://github.com/Torsoto/BudgetBuddy.git
```
Navigate to the project diary:
```bash
cd BudgetBuddy
```
Install the required dependencies in the root directory:
```bash
npm install
```

## Starting The App
### With Development Server

Start Development Server on [localhost:3000](http://localhost:3000/)
```bash
npm run dev
```
Open Desktop Applikation ( Development Server has to stay **OPEN** !! )
```bash
npm run electron:start
```
### Without Development Server
Building the App
```bash
npm run build
```
Open Desktop Applikation
```bash
npm run electron:start
```
Copyright (c) 2023 FH Campus Wien

This project, BudgetBuddy, is the property of FH Campus Wien and is protected by copyright laws. It is made available on GitHub for educational and reference purposes only. Any unauthorized use, reproduction, or distribution of this project is strictly prohibited.
