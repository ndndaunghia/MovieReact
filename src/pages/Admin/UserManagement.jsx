import React, { useState } from 'react';

const initialUsers = [
  { id: 1, name: 'Nguyen Van A', email: 'a@admin.com', role: 'Admin' },
  { id: 2, name: 'Tran Thi B', email: 'b@gmail.com', role: 'User' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'User' });

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers([
      ...users,
      { id: users.length + 1, ...form },
    ]);
    setForm({ name: '', email: '', role: 'User' });
    setShowForm(false);
  };

  return (
    <div>
      <h2 style={{marginBottom: 24}}>Quản lý người dùng</h2>
      <button
        style={{marginBottom: 20, padding: '8px 18px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer'}}
        onClick={() => setShowForm(true)}
      >
        + Thêm mới
      </button>
      <table style={{width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{background: '#f4f6fb', textAlign: 'left'}}>
            <th style={{padding: 12}}>ID</th>
            <th style={{padding: 12}}>Tên</th>
            <th style={{padding: 12}}>Email</th>
            <th style={{padding: 12}}>Vai trò</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td style={{padding: 12}}>{u.id}</td>
              <td style={{padding: 12}}>{u.name}</td>
              <td style={{padding: 12}}>{u.email}</td>
              <td style={{padding: 12}}>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div style={{position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.2)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000}}>
          <form onSubmit={handleAddUser} style={{background:'#fff', padding:32, borderRadius:12, minWidth:320, boxShadow:'0 4px 24px #bbb', display:'flex', flexDirection:'column', gap:16}}>
            <h3>Thêm người dùng</h3>
            <input required placeholder="Tên" value={form.name} onChange={e=>setForm(f=>({...f, name: e.target.value}))} style={{padding:8, borderRadius:6, border:'1px solid #ccc'}} />
            <input required placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f, email: e.target.value}))} style={{padding:8, borderRadius:6, border:'1px solid #ccc'}} />
            <select value={form.role} onChange={e=>setForm(f=>({...f, role: e.target.value}))} style={{padding:8, borderRadius:6, border:'1px solid #ccc'}}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <div style={{display:'flex', gap:12, marginTop:8}}>
              <button type="submit" style={{background:'#007bff', color:'#fff', border:'none', borderRadius:6, padding:'8px 18px', fontWeight:600}}>Lưu</button>
              <button type="button" onClick={()=>setShowForm(false)} style={{background:'#eee', color:'#333', border:'none', borderRadius:6, padding:'8px 18px'}}>Hủy</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement; 