import type { DialogueEvent } from '../game/types';

export const EVENTS: DialogueEvent[] = [
  {
    id: 'wrongKnock',
    title: 'The Knock',
    npcName: 'Roy Macabee',
    situation: 'Someone is knocking on the storage room door with the wrong pattern.',
    npcLine: '"Retta. Someone\'s knockin\'. And it ain\'t the right knock."',
    prompt: 'What do you do now?',
    options: [
      {
        label: 'Open calmly',
        shortText: 'Open the door and check.',
        money: 0, heat: -3, rep: 2,
        outcomeText: "It's the delivery man. Paper towels. He got confused. Bingo resumes.",
      },
      {
        label: 'Text Bubba',
        shortText: "Don't answer — text Bubba.",
        money: -1, heat: 0, rep: 0,
        outcomeText: 'Bubba gets there in 4 seconds. The delivery man has already walked away. Bingo resumes.',
      },
      {
        label: 'Yell "Occupied!"',
        shortText: '"Occupied!" through the door.',
        money: 0, heat: 5, rep: -2,
        outcomeText: "Delivery man flees. Front customers look up. One asks if that's a bathroom. Terri says yes.",
      },
    ],
  },
  {
    id: 'washerFlood',
    title: 'Washing Machine Flood',
    npcName: 'Olivia (Vlogger)',
    situation: 'Washer 2 has overflowed. Water spreading across the floor. Olivia has her camera out.',
    npcLine: '"Oh my GOD this is incredible content. Don\'t stop it — wait, okay, maybe stop it."',
    prompt: 'What do you do now?',
    options: [
      {
        label: 'Dispatch staff',
        shortText: 'Send Denny + Wanda. Stay calm.',
        money: -35, heat: 0, rep: 15,
        outcomeText: 'Professional response. Olivia\'s video: "Local Grandma Handles Flood Like a LEGEND."',
      },
      {
        label: 'Sprint yourself',
        shortText: 'Retta slides to the rescue.',
        money: -10, heat: 0, rep: 25,
        outcomeText: 'Retta slides 1.5 tiles on the wet floor, catches the counter, fixes the machine. Room applauds.',
      },
      {
        label: 'Bucket brigade',
        shortText: 'Ask customers for help.',
        money: -20, heat: 0, rep: 20,
        outcomeText: 'Seven customers participate. One bucket goes the wrong direction. Everyone laughs.',
      },
    ],
  },
  {
    id: 'pokerChipKid',
    title: 'The Kid and the Poker Chip',
    npcName: 'Jackson (8 years old)',
    situation: 'A kid found a poker chip under Washer 2. His mom is standing right there.',
    npcLine: '"MOMMY. Look what I found. It\'s a coin. Mrs. Retta what IS this?"',
    prompt: 'What do you do now?',
    options: [
      {
        label: 'County fair souvenir',
        shortText: '"County fair souvenir, honey."',
        money: 2, heat: 5, rep: 0,
        outcomeText: 'Jackson is satisfied. Mom buys detergent. Heat ticks slightly.',
      },
      {
        label: 'Trade for candy',
        shortText: 'Trade it for a candy bar.',
        money: -1, heat: 2, rep: 8,
        outcomeText: 'Jackson immediately accepts. Mom is charmed. She tips $5.',
      },
      {
        label: 'Laundry token',
        shortText: '"Special laundry token — free dryer!"',
        money: -3, heat: 3, rep: 10,
        outcomeText: 'Jackson uses his free dryer. He tells every kid he knows. A token economy briefly exists.',
      },
    ],
  },
  {
    id: 'slotSings',
    title: 'The Dryer Makes a Sound',
    npcName: 'Wanda Pickle',
    situation: 'A dryer is making an alarming musical noise. Front customers can hear it.',
    npcLine: '"Retta, I don\'t know what that dryer is doing but I can hear it from the folding tables."',
    prompt: 'What do you do now?',
    options: [
      {
        label: 'Send Denny now',
        shortText: 'Priority repair. Denny on it.',
        money: -20, heat: 8, rep: 0,
        outcomeText: 'Denny fixes it in 90 seconds. Front customers got 15 seconds of mystery music.',
      },
      {
        label: 'New washer test feature',
        shortText: '"Self-test cycle. Very normal."',
        money: 0, heat: 4, rep: 0,
        outcomeText: 'One customer says "I love the new machines." Retta agrees with them.',
      },
      {
        label: 'Grand Opening!',
        shortText: 'Lean in — announce a celebration.',
        money: 0, heat: 12, rep: 15,
        outcomeText: 'Front customers clap. Connie Dupree thinks this is a real event. She posts about it positively.',
      },
    ],
  },
  {
    id: 'newWasherSound',
    title: 'New Washer Noise',
    npcName: 'Denny Briggs',
    situation: 'The upgraded washer makes a strange banging every 30 seconds.',
    npcLine: '"She needs a break-in period. That\'s normal. Probably." (loud bang) "She\'ll be fine."',
    prompt: 'What do you do now?',
    options: [
      {
        label: 'Trust Denny',
        shortText: 'Let the machine settle.',
        money: 0, heat: 0, rep: 0,
        outcomeText: 'Machine is fine by morning. Denny was right.',
      },
      {
        label: 'Take it offline',
        shortText: 'Disable until confirmed safe.',
        money: -60, heat: 0, rep: 0,
        outcomeText: 'Safe, boring, costs one session of income.',
      },
      {
        label: 'Spa machine',
        shortText: '"It\'s the new massage feature!"',
        money: 15, heat: 0, rep: 10,
        outcomeText: 'Customers love Washer 4. "The spa machine." Denny is baffled.',
      },
    ],
  },
];
