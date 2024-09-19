let EventAnnouncementFormats;

if (!localStorage.getItem(`EventAnnouncementFormats`)) {
  EventAnnouncementFormats = [
`@everyone Attention, agent! You have been requested to approach an event upon the call of duty.

### <:EG_Game:1050486929805824010> Event \` {ID} \`
# <:SWAT:1204007959080861697> {EventTitle}
## <:SWATSalute:1050485166080000071> <t:{Timestamp}:F>, <t:{Timestamp}:R>
> _"{Description}"_

<:EG_Game:1050486929805824010> **[{CPPS.Name}:]({CPPS.Link} "Click or tap to redirect yourself to {CPPS.Name}!")** {CPPS.Link}
⏰ **Time:** <t:{Timestamp}:F>, <t:{Timestamp}:R>
<:SWATGoggles:1050485132651417650> **Server:** {Server}
<:EI_Igloo:1050487002589569065> **Room:** {Room}

> **Are you able to make it?**
> If so, please click or tap on \` Interested \`!
> {Link}

<:ET_Music:1050487576814960680> **See you there!**`
];
  localStorage.setItem(`EventAnnouncementFormats`, JSON.stringify(EventAnnouncementFormats));
} else {
  EventAnnouncementFormats = JSON.parse(localStorage.getItem(`EventAnnouncementFormats`));
}

let EventData = {
  ID: 0,
  Title: ``,
  Timestamp: 0,
  Link: ``,
  Description: ``,
  CPPS: {
    Name: ``,
    Link: ``
  },
  Server: ``,
  Room: ``
};

let Format = EventAnnouncementFormats[0];

function EditEvent(Input) {
  let Parameter = Input.name;
  let Value = Input.value;

  if (EventData[Parameter] == undefined) return;

  if (Parameter == `CPPS`) {
    EventData[Parameter].Name = `${Value}`;
    if (Value == `CPAB`) {
      EventData[Parameter].Link = `https://play.cpabattleground.com`;
    } else if (Value == `CPJ`) {
      EventData[Parameter].Link = `https://play.cpjourney.net`;
    } else if (Value == `NCP`) {
      EventData[Parameter].Link = `https://newcp.net/download`;
    } else if (Value == `CPAv`) {
      EventData[Parameter].Link = `https://cpavalanche.net/downloads`;
    }
  } else {
    EventData[Parameter] = Value;
  }

  RenderEventAnnouncement(`pre[name="Result"]`, GenerateEventAnnouncement(EventData));
  return EventData;
};

function GenerateEventAnnouncement(EventData = {}) {
  return (
    Format
      .replaceAll(`<`, `&lt;`)
      .replaceAll(`>`, `&gt;`)
      .replaceAll(`{ID}`, `<span name="ID" class="PreformattedValue">${EventData.ID}</span>`)
      .replaceAll(`{Title}`, `<span name="Title" class="PreformattedValue">${EventData.Title}</span>`)
      .replaceAll(`{Timestamp}`, `<span name="Timestamp" class="PreformattedValue">${EventData.Timestamp}</span>`)
      .replaceAll(`{Link}`, `<span name="Link" class="PreformattedValue">${EventData.Link}</span>`)
      .replaceAll(`{Description}`, `<span name="Description" class="PreformattedValue">${EventData.Description}</span>`)
      .replaceAll(`{CPPS.Name}`, `<span name="CPPS.Name" class="PreformattedValue">${EventData.CPPS.Name}</span>`)
      .replaceAll(`{CPPS.Link}`, `<span name="CPPS.Link" class="PreformattedValue">${EventData.CPPS.Link}</span>`)
      .replaceAll(`{Server}`, `<span name="Server" class="PreformattedValue">${EventData.Server}</span>`)
      .replaceAll(`{Room}`, `<span name="Room" class="PreformattedValue">${EventData.Room}</span>`)
  );
};

function GeneratePreformattedEventAnnouncement(Format = ``) {
  return (
    Format
      .replaceAll(`<`, `&lt;`)
      .replaceAll(`>`, `&gt;`)
      .replaceAll(`{ID}`, `<span name="ID" class="PreformattedValue">{ID}</span>`)
      .replaceAll(`{Title}`, `<span name="Title" class="PreformattedValue">{Title}</span>`)
      .replaceAll(`{Timestamp}`, `<span name="Timestamp" class="PreformattedValue">{Timestamp}</span>`)
      .replaceAll(`{Link}`, `<span name="Link" class="PreformattedValue">{Link}</span>`)
      .replaceAll(`{Description}`, `<span name="Description" class="PreformattedValue">{Description}</span>`)
      .replaceAll(`{CPPS.Name}`, `<span name="CPPS.Name" class="PreformattedValue">{CPPS.Name}</span>`)
      .replaceAll(`{CPPS.Link}`, `<span name="CPPS.Link" class="PreformattedValue">{CPPS.Link}</span>`)
      .replaceAll(`{Server}`, `<span name="Server" class="PreformattedValue">{Server}</span>`)
      .replaceAll(`{Room}`, `<span name="Room" class="PreformattedValue">{Room}</span>`)
  );
};

function RenderEventAnnouncement(QuerySelector, Announcement = ``) {
  return document.querySelector(QuerySelector).innerHTML = Announcement;
};

function CopyAnnouncement(Source) {
  return navigator.clipboard.writeText(Source.innerText);
};

function OpenPopup(QuerySelector) {
  return document.querySelector(QuerySelector).style.display = `initial`;
};

function ClosePopup(QuerySelector) {
  return document.querySelector(QuerySelector).style.display = `none`;
};

function CreateEventAnnouncementFormat(Source) {
  EventAnnouncementFormats.push(Source);
  localStorage.setItem(`EventAnnouncementFormats`, JSON.stringify(EventAnnouncementFormats));
  AddEventAnnouncementFormatToList(Source);
  ClosePopup(`#EventAnnouncementFormatCreator`);
};

function AddEventAnnouncementFormatToList(Format) {
  document.querySelector(`#FormatsList`).innerHTML += `
  <div>
    <pre>${GeneratePreformattedEventAnnouncement(Format)}</pre>
    <button onclick="UseEventAnnouncementFormat(this.previousElementSibling)">Use</button>
  </div>
  <br>
  <br>
`;
};

function DeleteAllEventAnnouncementFormats() {
  localStorage.removeItem('EventAnnouncementFormats');
  EventAnnouncementFormats = [];
  RegenerateEventAnnouncementFormatList();
};

function RegenerateEventAnnouncementFormatList() {
  document.querySelector(`#FormatsList`).innerHTML = ``;
  for (let i = 0; i < EventAnnouncementFormats.length; i++) {
    AddEventAnnouncementFormatToList(EventAnnouncementFormats[i]);
  }
};

function UseEventAnnouncementFormat(Source) {
  Format = Source.innerText;
  return ForceUpdate();
};

function ClearInputs() {
  document.querySelector(`input[name="ID"]`).value = ``;
  document.querySelector(`input[name="Title"]`).value = ``;
  document.querySelector(`input[name="Timestamp"]`).value = ``;
  document.querySelector(`input[name="Link"]`).value = ``;
  document.querySelector(`input[name="Description"]`).value = ``;
  document.querySelector(`select[name="CPPS"]`).value = ``;
  document.querySelector(`input[name="Server"]`).value = ``;
  document.querySelector(`input[name="Room"]`).value = ``;
};

function ForceUpdate() {
  EditEvent(document.querySelector(`input[name="ID"]`));
  EditEvent(document.querySelector(`input[name="Title"]`));
  EditEvent(document.querySelector(`input[name="Timestamp"]`));
  EditEvent(document.querySelector(`input[name="Link"]`));
  EditEvent(document.querySelector(`input[name="Description"]`));
  EditEvent(document.querySelector(`select[name="CPPS"]`));
  EditEvent(document.querySelector(`input[name="Server"]`));
  EditEvent(document.querySelector(`input[name="Room"]`));
};

ForceUpdate();

for (let i = 0; i < EventAnnouncementFormats.length; i++) {
  AddEventAnnouncementFormatToList(EventAnnouncementFormats[i]);
}

document.querySelector(`#FormatsListEditor`).value = localStorage.getItem(`EventAnnouncementFormats`);
