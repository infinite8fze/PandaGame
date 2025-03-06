import React, { useState, useRef } from "react";
import { SafeArea } from "../../SafeArea";
import { ChevronDown, ChevronUp, Calendar, Check, Plus } from "lucide-react";
import { ControlPanelIcon } from "../../icons";

interface ToggleOptionProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function ToggleOption({ label, isSelected, onClick }: ToggleOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`clickable px-6 py-3 rounded-[20px] transition-all duration-200 ${
        isSelected
          ? "bg-[#16BDFF] text-white"
          : "bg-white text-[#16BDFF] border border-[#16BDFF]"
      }`}
    >
      <span className="font-bold">{label}</span>
    </button>
  );
}

interface DropdownProps {
  title: string;
  date: string;
  description: string;
}

function Dropdown({ title, date, description }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="clickable w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-md border-2 border-[#B3E4EF]"
      >
        <div className="flex items-center">
          <Calendar className="w-6 h-6 mr-3 text-[#16BDFF]" />
          <span className="font-bold text-[#16BDFF] mr-4">{title}</span>
          <span className="text-[#16BDFF]">{date}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="bg-white rounded-b-lg p-4 mt-1 shadow-md">
          <p className="text-gray-700">{description}</p>
        </div>
      )}
    </div>
  );
}

interface DayButtonProps {
  day: string;
  isSelected: boolean;
  onClick: () => void;
}

function DayButton({ day, isSelected, onClick }: DayButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`clickable w-8 h-8 rounded-full flex items-center justify-center transition-all ${
        isSelected
          ? "bg-green-500 text-white"
          : "bg-white text-black border border-gray-300"
      }`}
    >
      {day}
    </button>
  );
}

interface DailyTaskProps {
  id: string;
  message: string;
  time: string;
  days: string[];
  isChecked: boolean;
  onDelete: (id: string) => void;
  onToggleCheck: (id: string) => void;
  onUpdateDays: (id: string, days: string[]) => void;
  onUpdateTime: (id: string, time: string) => void;
  onUpdateMessage: (id: string, message: string) => void;
}

function DailyTask({
  id,
  message,
  time,
  days,
  isChecked,
  onDelete,
  onToggleCheck,
  onUpdateDays,
  onUpdateTime,
  onUpdateMessage,
}: DailyTaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);
  const allDays = ["S", "M", "T", "W", "T", "F", "S"];

  const handleDayToggle = (day: string) => {
    const newDays = days.includes(day)
      ? days.filter((d) => d !== day)
      : [...days, day];
    onUpdateDays(id, newDays);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateTime(id, e.target.value);
  };

  const handleMessageSave = () => {
    onUpdateMessage(id, editedMessage);
    setIsEditing(false);
  };

  return (
    <div className="flex mb-4">
      {/* Checkbox and delete button outside the box */}
      <div className="mr-4 flex flex-col items-center">
        <button
          onClick={() => onToggleCheck(id)}
          className="clickable w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center mb-4"
        >
          {isChecked && <Check className="w-4 h-4 text-green-500" />}
        </button>
        <button
          onClick={() => onDelete(id)}
          className="clickable text-[#BFC7E1] hover:text-[#9DA5C9]"
        >
          <img
            src="/svg/remove.svg"
            alt="Delete"
            className="w-5 h-5"
            style={{ fill: "#BFC7E1" }}
          />
        </button>
      </div>

      {/* Task content box */}
      <div className="flex-1 bg-white rounded-xl p-4 shadow-md border-2 border-[#229654] relative">
        {/* Message */}
        {isEditing ? (
          <div className="mb-3">
            <input
              type="text"
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="clickable w-full p-2 border border-gray-300 rounded"
              autoFocus
              onBlur={handleMessageSave}
              onKeyDown={(e) => e.key === "Enter" && handleMessageSave()}
            />
          </div>
        ) : (
          <div
            className="text-lg font-medium mb-3 cursor-pointer text-[#229654]"
            onClick={() => setIsEditing(true)}
          >
            {message}
          </div>
        )}

        {/* Time and days */}
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="text-gray-700">09:00 AM</span>
          </div>

          <div className="flex space-x-1 ml-4">
            {allDays.map((day, index) => (
              <DayButton
                key={index}
                day={day}
                isSelected={days.includes(day)}
                onClick={() => handleDayToggle(day)}
              />
            ))}
          </div>
        </div>

        {/* Schedule button */}
        <button className="absolute bottom-4 right-4 bg-[#229654] text-white px-4 py-2 rounded-lg flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule
        </button>
      </div>
    </div>
  );
}

interface SimpleMessageSectionProps {
  title: string;
  subtitle: string;
  examples: string[];
}

function SimpleMessageSection({
  title,
  subtitle,
  examples,
}: SimpleMessageSectionProps) {
  return (
    <div className="mb-8">
      <h4 className="text-xl font-medium text-[#1F2020] mb-2">{title}</h4>
      <p className="text-gray-600 mb-4">{subtitle}</p>

      <div className="space-y-2 ml-4">
        {examples.map((example, index) => (
          <p key={index} className="text-gray-700">
            {example}
          </p>
        ))}
      </div>
    </div>
  );
}


export function PersonalizedDialoguePage() {
  const [selectedTone, setSelectedTone] = useState<
    "formal" | "casual" | "educational"
  >("educational");
  const [tasks, setTasks] = useState([
    {
      id: "1",
      message: "Don't forget to brush your teeth before bed!",
      time: "09:00",
      days: ["M", "T", "W"],
      isChecked: false,
    },
  ]);
  const [newTaskText, setNewTaskText] = useState("");
  const newTaskInputRef = useRef<HTMLInputElement>(null);

  // Get current date for daily report
  const today = new Date();
  const formattedToday = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  // Get date range for weekly report
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);
  const formattedWeekAgo = weekAgo.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const formattedWeekRange = `${formattedWeekAgo} - ${formattedToday}`;

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleCheck = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  const handleUpdateDays = (id: string, days: string[]) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, days } : task)));
  };

  const handleUpdateTime = (id: string, time: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, time } : task)));
  };

  const handleUpdateMessage = (id: string, message: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, message } : task))
    );
  };

  const handleAddTask = () => {
    if (newTaskText.trim() === "") {
      // Focus the input if it's empty
      newTaskInputRef.current?.focus();
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      message: newTaskText,
      time: "12:00",
      days: [],
      isChecked: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  // Example messages for each section
  const encouragementExamples = [
    "You're amazing! Keep up the great effort!",
    "You practiced so well today, great job!",
    "If you fail, it's okay! Every time you try, you get stronger.",
  ];

  const ethicalExamples = [
    "Be kind to your friends and help them.",
    "When you borrow something, remember to return it on time.",
    "If you make a mistake, it's okay! Just always take responsibility for it.",
  ];

  const parentalExamples = [
    "Mommy and Daddy always love you and are proud of you!",
    "Don't forget, you can always ask me for help whenever you need it.",
  ];

  return (
            <div className="max-w-2xl mx-auto">
              {/* Conversation Tone Options */}
              <div className="p-6 mb-8">
                <h3 className="extra-sm:text-xl md:text-2xl font-bold text-[#1F2020] mb-6">
                  1. Conversation Tone Options
                </h3>

                <div className="flex flex-wrap gap-4 justify-left">
                  <ToggleOption
                    label="Formal"
                    isSelected={selectedTone === "formal"}
                    onClick={() => setSelectedTone("formal")}
                  />
                  <ToggleOption
                    label="Casual"
                    isSelected={selectedTone === "casual"}
                    onClick={() => setSelectedTone("casual")}
                  />
                  <ToggleOption
                    label="Educational"
                    isSelected={selectedTone === "educational"}
                    onClick={() => setSelectedTone("educational")}
                  />
                </div>
              </div>

              {/* Conversation Reports Frequency */}
              <div className="p-6 mb-8">
                <h3 className="text-2xl text-[#1F2020] mb-2">
                  2. Conversation Reports Frequency
                </h3>
                <p className="text-gray-600 mb-6">
                  Stay informed about your child's interactions with Panda
                </p>

                <Dropdown
                  title="Daily"
                  date={formattedToday}
                  description="No Data"
                />

                <Dropdown
                  title="Weekly"
                  date={formattedWeekRange}
                  description="You can enter specific sentences for the character to say to the child in You can enter specific sentences for the character to."
                />
              </div>

              {/* Custom Message Setup */}
              <div className="p-6 mb-8">
                <h3 className="text-2xl text-[#1F2020] mb-2">
                  3. Custom Message Setup
                </h3>
                <p className="text-gray-600 mb-6">
                  Personalize your child's experience by choosing or creating
                  tailored messages for reminders, encouragement, behavior, and
                  more at specific times.
                </p>

                {/* Daily Reminders Section */}
                <div className="mb-8">
                  <h4 className="text-xl font-medium text-[#1F2020] mb-2">
                    1.Daily Reminders
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Set Daily reminders by choosing or adding your own message,
                    and set the date and time.
                  </p>

                  {/* Daily Tasks */}
                  {tasks.map((task) => (
                    <DailyTask
                      key={task.id}
                      id={task.id}
                      message={task.message}
                      time={task.time}
                      days={task.days}
                      isChecked={task.isChecked}
                      onDelete={handleDeleteTask}
                      onToggleCheck={handleToggleCheck}
                      onUpdateDays={handleUpdateDays}
                      onUpdateTime={handleUpdateTime}
                      onUpdateMessage={handleUpdateMessage}
                    />
                  ))}

                  {/* Add new task input */}
                  <div className="flex mb-4">
                    <div className="mr-4 w-6"></div>{" "}
                    {/* Spacer to align with tasks */}
                    <div className="flex-1 bg-white rounded-xl p-4 shadow-md border-2 border-dashed border-[#229654]">
                      <div className="flex items-center">
                        <input
                          ref={newTaskInputRef}
                          type="text"
                          value={newTaskText}
                          onChange={(e) => setNewTaskText(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your reminder message here..."
                          className="flex-1 p-2 border border-gray-300 rounded mr-2"
                        />
                        <button
                          onClick={handleAddTask}
                          className="bg-[#229654] text-white px-4 py-2 rounded-lg flex items-center"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Encouragement & Motivational Messages Section */}
                <SimpleMessageSection
                  title="2.Encouragement & Motivational Messages"
                  subtitle="Send inspiring and positive messages to motivate your child and boost their confidence."
                  examples={encouragementExamples}
                />

                {/* Ethical & Behavioral Messages Section */}
                <SimpleMessageSection
                  title="3.Ethical & Behavioral Messages"
                  subtitle="Provide gentle guidance on ethics and good behavior with tailored messages that reinforce positive values."
                  examples={ethicalExamples}
                />

                {/* Personalized Parental Messages Section */}
                <SimpleMessageSection
                  title="4.Personalized Parental Messages"
                  subtitle="Craft custom messages to connect with your child personally, offering support and love based on their needs."
                  examples={parentalExamples}
                />
              </div>
            </div>
  );
}
