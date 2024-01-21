import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firestore.mjs";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import "../styles/Cards.css";

const Cards = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [maxCards, setMaxCards] = useState(false);
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    bankname: "",
    iban: "",
    validTill: "",
  });

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  const displayCards = () => {
    const cardsList = document.getElementById("cards-list");

    while (cardsList.firstChild) {
      cardsList.removeChild(cardsList.firstChild);
    }

    cards.forEach((card) => {
      // Create a div for each card
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card-item");

      const bankParagraph = document.createElement("h4");
      bankParagraph.textContent = `Bank: ${card.bankname}`;
      cardDiv.appendChild(bankParagraph);

      const ibanParagraph = document.createElement("p");
      ibanParagraph.textContent = `IBAN: ${card.iban}`;
      cardDiv.appendChild(ibanParagraph);

      const validTillParagraph = document.createElement("p");
      validTillParagraph.textContent = `Valid Till: ${card.validTill}`;
      cardDiv.appendChild(validTillParagraph);

      const rmBtn = document.createElement("button");
      rmBtn.classList.add("remove-button");
      rmBtn.textContent = "-";
      rmBtn.onclick = function () {
        deleteCard(card.id);
      };
      cardDiv.appendChild(rmBtn);

      // Append the div to the cardsList
      cardsList.appendChild(cardDiv);
    });
  };

  const addCard = async (e) => {
    e.preventDefault();
    console.log(newCard);
    setFormVisible(!formVisible);

    if (!auth.currentUser) {
      // User not authenticated, handle this case as needed
      console.log("Not logged in (add)");
      return;
    }

    const userUid = auth.currentUser.uid;

    const entryRef = await addDoc(collection(db, "users", userUid, "cards"), {
      ...newCard,
    });

    setCards((prevEntries) => [
      ...prevEntries,
      { ...newCard, id: entryRef.id },
    ]);

    setNewCard({
      bankname: "",
      iban: "",
      validTill: "",
    });
  };

  const deleteCard = async (id) => {
    if (!auth.currentUser) {
      // User not authenticated, handle this case as needed
      return;
    }

    const userUid = auth.currentUser.uid;

    // Find the index of the entry with the given id
    const entryIndex = cards.findIndex((entry) => entry.id === id);
    const delCard = cards[entryIndex];
    console.log("deleting entry");

    // If the entry is found, remove it from the user's entries in Firestore and the array
    if (entryIndex !== -1) {
      const cardRef = doc(db, "users", userUid, "cards", id);
      await deleteDoc(cardRef);

      const updatedCards = [...cards];
      updatedCards.splice(entryIndex, 1);
      setCards(updatedCards);

      // removing card from entries

      const entriesCollection = collection(db, "users", userUid, "entries");
      const entriesSnapshot = await getDocs(entriesCollection);
      const entriesData = entriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Find entries with the deleted card's ID
      const affectedEntries = entriesData.filter(
        (entry) => entry.bankname === delCard.bankname
      );
      console.log(delCard)
      console.log(affectedEntries)

      // Update entries
      const updatedEntries = entriesData.map((entry) =>
        affectedEntries.find((affectedEntry) => affectedEntry.bankname === entry.bankname)
          ? { ...entry, bankname: "" } // Remove reference to the deleted card
          : entry
      );

      // Update entries in Firestore
      updatedEntries.forEach(async (entry) => {
        const entryRef = doc(db, "users", userUid, "entries", entry.id);
        await updateDoc(entryRef, { bankname: entry.bankname });
      });
    }
  };

  const fetchData = async () => {
    if (!auth.currentUser) {
      // User not authenticated, handle this case as needed
      console.log("not logged in");
      return;
    }
    console.log("Loading Cards");
    const userUid = auth.currentUser.uid;
    console.log("For User " + userUid);

    const cardsCollection = collection(db, "users", userUid, "cards");
    const cardsSnapshot = await getDocs(cardsCollection);

    const cardsData = cardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCards(cardsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    displayCards();
    if (cards.length >= 5) {
      setMaxCards(true);
    } else {
      setMaxCards(false);
    }
  }, [cards]);

  return (
    <div className="cards-container">
      <h3>Cards</h3>
      <ul id="cards-list"></ul>
      <button onClick={toggleForm} hidden={maxCards}>
        Open Form
      </button>
      {formVisible && (
        <div id="formContainer">
          <form>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) =>
                setNewCard({ ...newCard, bankname: e.target.value })
              }
              required
            />

            <br />

            <label htmlFor="iban">IBAN:*</label>
            <input
              type="text"
              id="iban"
              name="iban"
              onChange={(e) => setNewCard({ ...newCard, iban: e.target.value })}
            />

            <br />

            <label htmlFor="iban">Valid till:*</label>
            <input
              type="datetime-local"
              id="validTill"
              name="validTill"
              onChange={(e) =>
                setNewCard({ ...newCard, validTill: e.target.value })
              }
            />

            <br />

            <button type="button" onClick={addCard}>
              Add Card
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cards;
