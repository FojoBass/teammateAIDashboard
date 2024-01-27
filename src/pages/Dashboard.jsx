import React, { useEffect, useRef, useState } from 'react';
import avi from '../assets/cat avatar.png';
import { CiLock, CiLogout, CiUnlock, CiViewList } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai';
import { tasks } from '../data';
import '../styles/dash.css';
import { FaArrowCircleLeft, FaArrowCircleRight, FaPlus } from 'react-icons/fa';
import { v4 } from 'uuid';

const Dashboard = () => {
  // const { dashNavOpt, setDashNavOpt } = useGlobalContext();
  const [dashNavOpt, setDashNavOpt] = useState('view');
  const [dispTasks, setDispTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [filTasks, setFilTasks] = useState([]);
  const [pages, setPages] = useState([]);
  const [currPage, setCurrPage] = useState('1');
  const tasksPerPage = useRef(10);
  const [filStat, setFilStat] = useState('all');
  const notEntry = useRef(false);
  const [isShowNav, setIsShowNav] = useState(false);

  const formatDate = (num) => {
    let modNum = String(num);
    if (modNum.length < 2) modNum = '0' + modNum;
    return modNum;
  };

  const newTask = () => {
    if (filStat !== 'all') setFilStat('all');

    const task = {
      title: 'New Task',
      desc: 'This is a new uneditted task',
      dueDate: `${formatDate(new Date().getDate() + 1)}-${formatDate(
        new Date().getMonth() + 1
      )}-${new Date().getFullYear()}`,
      id: v4(),
      status: 'pending',
    };

    setAllTasks((prev) => [task, ...prev]);
  };

  useEffect(() => {
    const localTasks = localStorage.getItem('TM_dashTasks')
      ? JSON.parse(localStorage.getItem('TM_dashTasks'))
      : tasks;
    setAllTasks(localTasks);

    const timer = setTimeout(() => {
      notEntry.current = true;
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (notEntry.current)
      localStorage.setItem('TM_dashTasks', JSON.stringify(allTasks));
  }, [allTasks]);

  useEffect(() => {
    let modTasks = allTasks;

    if (filStat !== 'all') {
      modTasks = modTasks.filter((task) => task.status === filStat);
    }

    setCurrPage('1');
    setFilTasks(modTasks);

    setPages(
      new Array(Math.ceil(modTasks.length / tasksPerPage.current)).fill('')
    );
  }, [allTasks, filStat]);

  useEffect(() => {
    let modCurrpage = currPage;

    const start = (Number(modCurrpage) - 1) * tasksPerPage.current;
    const end = Number(modCurrpage) * tasksPerPage.current;

    setDispTasks(filTasks.slice(start, end));
  }, [currPage, filTasks, filStat]);

  return (
    <section id='dashboard' className='sect'>
      <h1>
        <button
          className='show_nav_btn'
          onClick={() => setIsShowNav(!isShowNav)}
        >
          {!isShowNav ? <FaArrowCircleRight /> : <FaArrowCircleLeft />}
        </button>
        Dashboard
      </h1>
      <div className='center_sect'>
        <aside className={`dash_nav ${isShowNav ? 'active' : ''}`}>
          <div className='top_side'>
            <div className='img_wrapper'>
              <img src={avi} />
            </div>

            <p className='name'>John Doe</p>
          </div>

          <div className='opts_wrapper'>
            <button
              className={`opt ${dashNavOpt === 'view' ? 'active' : ''}`}
              onClick={() => setDashNavOpt('view')}
            >
              <span className='icon'>
                <CiViewList />
              </span>
              View Tasks
            </button>

            <button
              className={`opt ${dashNavOpt === 'profile' ? 'active' : ''}`}
              onClick={() => setDashNavOpt('profile')}
            >
              <span className='icon'>
                <IoPersonOutline />
              </span>
              Profile
            </button>

            <button className='opt'>
              <span className='icon'>
                <CiLogout />
              </span>
              Logout
            </button>
          </div>
        </aside>

        <main className='dash_wrapper'>
          <div className='top_side'>
            <button className='add_btn' onClick={newTask}>
              <span className='icon'>
                <FaPlus />
              </span>
              New task
            </button>

            <select
              id='filter'
              defaultValue={filStat}
              onClick={(e) => setFilStat(e.target.value)}
            >
              <option value='all'>all</option>
              <option value='pending'>pending</option>
              <option value='completed'>completed</option>
              <option value='due'>due</option>
            </select>
          </div>

          {dispTasks.length ? (
            <table className='dash'>
              <thead>
                <tr>
                  <th className='title'>title</th>
                  <th className='desc'>description</th>
                  <th className='status'>status</th>
                  <th className='due'>due</th>
                  {/* <th className=''>actions</th> */}
                </tr>
              </thead>

              <tbody>
                {dispTasks.map((task) => (
                  <TaskOpt
                    task={task}
                    key={task.id}
                    allTasks={allTasks}
                    setAllTasks={setAllTasks}
                    formatDate={formatDate}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tasks</p>
          )}

          <select
            id='page'
            onChange={(e) => setCurrPage(e.target.value)}
            defaultValue={currPage}
          >
            {pages.map((page, index) => (
              <option value={String(index + 1)} key={index}>
                {index + 1}
              </option>
            ))}
          </select>
        </main>
      </div>
    </section>
  );
};

export default Dashboard;

const TaskOpt = ({
  task: { title, desc, status, dueDate, id },
  allTasks,
  setAllTasks,
  formatDate,
}) => {
  const [lock, setLock] = useState(true);
  const [modDueDate, setModDueDate] = useState('');
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const [isDel, setIsDel] = useState(false);

  const handleTextChange = (e, key) => {
    const input = e.target.textContent.trim();
    const modAllTasks = allTasks.map((task) =>
      task.id === id ? { ...task, [key]: input } : task
    );

    setAllTasks(modAllTasks);
  };

  const today = `${new Date().getFullYear()}-${formatDate(
    new Date().getMonth() + 1
  )}-${formatDate(new Date().getDate())}`;

  const handleStatusChange = (e) => {
    const modAllTasks = allTasks.map((task) =>
      task.id === id ? { ...task, status: e.target.value } : task
    );

    setAllTasks(modAllTasks);
  };

  const handleDateChange = (e) => {
    const fixedDate = `${e.target.value.slice(8)}${e.target.value.slice(
      4,
      7
    )}-${e.target.value.slice(0, 4)}`;
    const modAllTasks = allTasks.map((task) =>
      task.id === id ? { ...task, dueDate: fixedDate } : task
    );

    setAllTasks(modAllTasks);
  };

  const handleDel = () => {
    const modAllTasks = allTasks.filter((task) => task.id !== id);

    setAllTasks(modAllTasks);
  };

  useEffect(() => {
    setModDueDate(
      `${dueDate.slice(6)}${dueDate.slice(2, 6)}${dueDate.slice(0, 2)}`
    );

    const currDate = new Date();
    const expiryDate = new Date(
      parseInt(dueDate.slice(6)),
      parseInt(dueDate.slice(3, 5)),
      parseInt(dueDate.slice(0, 2))
    );

    console.log(
      expiryDate.getTime(),
      expiryDate.getTime() < currDate.getTime()
    );

    if (expiryDate.getTime() < currDate.getTime() && status !== 'completed') {
      const modAllTasks = allTasks.map((task) =>
        task.id === id ? { ...task, status: 'due' } : task
      );

      setAllTasks(modAllTasks);
    }
  }, [dueDate]);

  useEffect(() => {
    const containerEl = containerRef.current;
    const contentEl = contentRef.current;

    if (containerEl && contentEl) {
      if (isDel)
        containerEl.style.height =
          contentEl.getBoundingClientRect().height + 'px';
      else containerEl.style.height = '0px';
    }
  }, [isDel]);

  return (
    <tr>
      <td
        className='title'
        contentEditable={!lock}
        suppressContentEditableWarning
        onBlur={(e) => handleTextChange(e, 'title')}
      >
        {title}
      </td>
      <td
        className='desc'
        contentEditable={!lock}
        suppressContentEditableWarning
        onBlur={(e) => handleTextChange(e, 'desc')}
      >
        {desc}
      </td>
      <td className='status'>
        {lock ? (
          <span className={status}>{status}</span>
        ) : status !== 'due' ? (
          <select defaultValue={status} onChange={handleStatusChange}>
            <option value='pending'>pending</option>
            <option value='completed'>completed</option>
          </select>
        ) : (
          <span className={status}>{status}</span>
        )}
      </td>
      <td className='due'>
        {lock ? (
          dueDate
        ) : (
          <input
            type='date'
            value={modDueDate}
            onChange={handleDateChange}
            min={today}
          />
        )}
      </td>
      <td className='actions'>
        <div className='btns_wrapper'>
          <button
            className='edit_btn'
            data-id={id}
            onClick={() => setLock(!lock)}
          >
            {lock ? <CiLock /> : <CiUnlock />}
          </button>
          <button
            className='del_btn'
            data-id={id}
            onClick={() => setIsDel(true)}
          >
            <AiOutlineDelete />
          </button>
        </div>

        <div className='notice_wrapper' ref={containerRef}>
          <p className='notice' ref={contentRef}>
            Delete?
            <div className='buttons'>
              <button className='yes_btn' onClick={handleDel}>
                yes
              </button>
              <button className='no_btn' onClick={() => setIsDel(false)}>
                no
              </button>
            </div>
          </p>
        </div>
      </td>
    </tr>
  );
};
