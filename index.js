const storyBox = document.querySelector("#story");
const choiceBox = document.querySelector("#choice-box");

let currentStoryText = "";
let selectedIndex = 0;
let selectedMax = 0;

function arrowKeys(e) {
    if (selectedMax === 0) return;

    if (e.key === "ArrowUp") selectedIndex--;
    if (e.key === "ArrowDown") selectedIndex++;

    if (selectedIndex < 0) selectedIndex = selectedMax;
    if (selectedIndex > selectedMax) selectedIndex = 0;

    document.querySelectorAll("li").forEach(li => li.classList.remove("selected"));
    document.querySelector(`#choice-${selectedIndex}`).classList.add("selected");
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function story(text) {
    for (let i = 0; i < text.length; i++) {
        currentStoryText += text.substring(i, i + 1);
        storyBox.innerText = currentStoryText;
        await wait(25);
    }
}

function clear() {
    currentStoryText = "";
    document.querySelector("#story").innerText = "";
}

function prompt(choices) {
    return new Promise(resolve => {
        function onEnter(e) {
            if (e.key !== "Enter") return;

            while (choiceBox.firstChild) choiceBox.removeChild(choiceBox.firstChild);
            selectedMax = 0;
            removeEventListener("keypress", onEnter);
            resolve(selectedIndex);
        }

        for (const i in choices) {
            const li = document.createElement("li");
            li.innerText = choices[i];
            li.id = `choice-${i}`;
            if (i === "0") li.classList.add("selected");
            choiceBox.appendChild(li);
        }

        selectedIndex = 0;
        selectedMax = choices.length - 1;

        addEventListener("keypress", onEnter);
    });
}

async function main() {
    await story("Lord of the Flies Museum Artifact\nMatthew Weir");

    await prompt(["Start"]);

    clear();

    await story(`You wake up alone in your house at 1 o’clock in the morning to a noise in your closet. It sounds like something is moving around, ruffling through your things.`);

    currentStoryText += "\n\n(Arrow keys to change selection, Enter to confirm)";
    storyBox.innerText = currentStoryText;

    let choice = await prompt([
        "Investigate",
        "Go back to sleep"
    ]);

    clear();

    switch(choice) {
        case 0:
            await story(`You get out of bed in order to take a look, but your fear gets the better of you before you reach the closet door. Defeated, you attempt to go back to sleep.`);
            break;
        case 1:
            await story("Thinking it’s probably nothing, you shut your eyes. The noise you thought you heard lingers in the back of your mind.");
            break;
    }

    await prompt(["Continue"]);

    clear();

    await story(`You wake up again at 2 A.M. to a loud THUMP sound, yet again coming from the closet. It scares you enough that you jump right out of bed.`);

    choice = await prompt([
        "Investigate",
        "Go back to sleep"
    ]);

    clear();

    switch(choice) {
        case 0:
            await story(`“There is no way I’m going into THAT closet,” you say, steering far away from the door.`);
            break;
        case 1:
            await story("You try to fall asleep, but you aren’t getting anywhere after half an hour.");
            break;
    }

    await prompt(["Continue"]);

    clear();

    await story("You head downstairs, thinking a glass of milk might help you sleep better. As you drink the milk, you let your mind wander. You think about all of the possible things that could be in the closet. Maybe a bear got into the house somehow. Maybe a serial killer is hiding in there, waiting to make their next move. Whatever it is, you are scared to think about it anymore.");

    await prompt(["Continue"]);

    clear();

    await story("While you are downstairs, you feel a slight urge to use the bathroom, but you are kind of tired and would just rather go in the morning. What should you do?");

    choice = await prompt([
        "Use the bathroom",
        "Head to bed"
    ]);

    clear();

    switch (choice) {
        case 0:
            await story("You use the bathroom, and then head upstairs.");
            break;
        case 1:
            await story("You head upstairs, suppressing the urge to use the bathroom.");
            break;
    }

    await prompt(["Continue"]);

    clear();

    await story("After laying in bed for 30 minutes, you finally fall asleep. In your slumbers, your mind finally lets loose, giving you the worst nightmare of your life. Out of the closet comes a…");

    choice = await prompt([
        "Ferocious bear",
        "Serial killer"
    ]);

    clear();

    switch (choice) {
        case 0:
            await story("…ferocious bear. It’s eyes turn directly at you, and it lunges straight at your bed. ");
            break;
        case 1:
            await story("…serial killer. They pull out their knife and slowly start walking towards your bed while you are unable to move. ");
            break;
    }

    await story("Instantly waking up from your nightmare, you jump out of bed and run towards the closet. Your heart is pounding as you fearfully approach the closet door. You grab the handle, and slowly push the door open. You look into the closet and you see…");

    await prompt(["Continue"]);

    clear();

    await story("…your cat, Sally, peacefully taking a nap on the floor.");

    await prompt(["Restart"]);

    clear();

    main().catch(console.error);
}

addEventListener("keydown", arrowKeys);

main().catch(console.error);