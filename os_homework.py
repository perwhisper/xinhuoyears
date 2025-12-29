import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import time

# -------------- 模拟文件系统核心--------------
BLOCK_SIZE = 4096
TOTAL_BLOCKS = 1024
INODE_COUNT = 128

class Inode:
    def __init__(self, inode_id):
        self.inode_id = inode_id
        self.type = None  # 'file'/'dir'
        self.size = 0
        self.blocks = []
        self.parent = None

class SimFileSystem:
    def __init__(self):
        self.inodes = [Inode(i) for i in range(INODE_COUNT)]
        self.free_blocks = [True] * TOTAL_BLOCKS
        self.data_blocks = [b"" for _ in range(TOTAL_BLOCKS)]
        self.inodes[0].type = 'dir'
        self.inodes[0].parent = 0
        self.cwd = 0  # 当前工作目录i节点ID

    def alloc_block(self):
        for i in range(TOTAL_BLOCKS):
            if self.free_blocks[i]:
                self.free_blocks[i] = False
                return i
        raise Exception("磁盘空间不足")

    def free_block(self, block_id):
        if 0 <= block_id < TOTAL_BLOCKS:
            self.free_blocks[block_id] = True
            self.data_blocks[block_id] = b""

    def create(self, name, type_):
        inode_id = None
        for i in range(INODE_COUNT):
            if self.inodes[i].type is None:
                inode_id = i
                break
        if inode_id is None:
            raise Exception("i节点耗尽")
        inode = self.inodes[inode_id]
        inode.type = type_
        inode.parent = self.cwd
        parent_inode = self.inodes[self.cwd]
        if not parent_inode.blocks:
            parent_block = self.alloc_block()
            parent_inode.blocks.append(parent_block)
        block_id = parent_inode.blocks[0]
        self.data_blocks[block_id] += f"{name}:{inode_id}\n".encode()
        return inode_id

    def ls(self):
        cwd_inode = self.inodes[self.cwd]
        if cwd_inode.type != 'dir':
            raise Exception("当前路径不是目录")
        content = []
        for block_id in cwd_inode.blocks:
            data = self.data_blocks[block_id].decode()
            for line in data.splitlines():
                if line:
                    name, inode_id = line.split(":")
                    content.append((name, int(inode_id)))
        return content

    def write_file(self, inode_id, data):
        inode = self.inodes[inode_id]
        if inode.type != 'file':
            raise Exception("不是文件")
        for block_id in inode.blocks:
            self.free_block(block_id)
        inode.blocks = []
        data_bytes = data.encode()
        inode.size = len(data_bytes)
        for i in range(0, len(data_bytes), BLOCK_SIZE):
            block_data = data_bytes[i:i+BLOCK_SIZE]
            block_id = self.alloc_block()
            self.data_blocks[block_id] = block_data
            inode.blocks.append(block_id)

    def read_file(self, inode_id):
        inode = self.inodes[inode_id]
        if inode.type != 'file':
            raise Exception("不是文件")
        data = b""
        for block_id in inode.blocks:
            data += self.data_blocks[block_id]
        return data.decode()

    def delete(self, name):
        target_inode_id = None
        cwd_inode = self.inodes[self.cwd]
        for block_id in cwd_inode.blocks:
            data = self.data_blocks[block_id].decode()
            lines = data.splitlines()
            new_lines = []
            for line in lines:
                if line:
                    n, i = line.split(":")
                    if n == name:
                        target_inode_id = int(i)
                    else:
                        new_lines.append(line)
            self.data_blocks[block_id] = "\n".join(new_lines).encode()
        if target_inode_id is None:
            raise Exception("文件/目录不存在")
        target_inode = self.inodes[target_inode_id]
        for block_id in target_inode.blocks:
            self.free_block(block_id)
        target_inode.type = None
        target_inode.size = 0
        target_inode.blocks = []
        target_inode.parent = None

# -------------- tkinter 交互式界面 --------------
class FileSystemGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("模拟文件系统")
        self.root.geometry("800x600")
        self.fs = SimFileSystem()

        # 1. 布局划分
        self.left_frame = ttk.Frame(root, width=200)
        self.left_frame.pack(side=tk.LEFT, fill=tk.Y, padx=5, pady=5)
        self.right_frame = ttk.Frame(root)
        self.right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=5, pady=5)

        # 2. 左侧：目录树
        self.tree_label = ttk.Label(self.left_frame, text="文件目录")
        self.tree_label.pack()
        self.dir_tree = ttk.Treeview(self.left_frame)
        self.dir_tree.pack(fill=tk.BOTH, expand=True)
        self.dir_tree.insert("", "0", "root", text="/")
        self.refresh_tree()

        # 3. 右侧：操作区
        # 3.1 按钮组
        self.btn_frame = ttk.Frame(self.right_frame)
        self.btn_frame.pack(fill=tk.X, pady=5)

        self.mkdir_btn = ttk.Button(self.btn_frame, text="创建目录", command=self.mkdir)
        self.mkdir_btn.pack(side=tk.LEFT, padx=2)
        self.touch_btn = ttk.Button(self.btn_frame, text="创建文件", command=self.touch)
        self.touch_btn.pack(side=tk.LEFT, padx=2)
        self.rm_btn = ttk.Button(self.btn_frame, text="删除", command=self.rm)
        self.rm_btn.pack(side=tk.LEFT, padx=2)
        self.write_btn = ttk.Button(self.btn_frame, text="写入文件", command=self.write_file)
        self.write_btn.pack(side=tk.LEFT, padx=2)
        self.read_btn = ttk.Button(self.btn_frame, text="读取文件", command=self.read_file)
        self.read_btn.pack(side=tk.LEFT, padx=2)

        # 3.2 文件名输入框
        self.name_var = tk.StringVar()
        self.name_entry = ttk.Entry(self.right_frame, textvariable=self.name_var)
        self.name_entry.pack(fill=tk.X, pady=5)
        # 简单模拟placeholder
        self.name_entry.insert(0, "输入文件/目录名")
        self.name_entry.bind("<FocusIn>", lambda e: self.name_entry.delete(0, tk.END) if self.name_entry.get() == "输入文件/目录名" else None)
        self.name_entry.bind("<FocusOut>", lambda e: self.name_entry.insert(0, "输入文件/目录名") if self.name_entry.get() == "" else None)

        # 3.3 文件内容输入框
        self.content_var = tk.StringVar()
        self.content_entry = ttk.Entry(self.right_frame, textvariable=self.content_var)
        self.content_entry.pack(fill=tk.X, pady=5)
        # 简单模拟placeholder
        self.content_entry.insert(0, "输入要写入的内容")
        self.content_entry.bind("<FocusIn>", lambda e: self.content_entry.delete(0, tk.END) if self.content_entry.get() == "输入要写入的内容" else None)
        self.content_entry.bind("<FocusOut>", lambda e: self.content_entry.insert(0, "输入要写入的内容") if self.content_entry.get() == "" else None)

        # 3.4 日志输出区
        self.log_label = ttk.Label(self.right_frame, text="操作日志")
        self.log_label.pack()
        self.log_text = scrolledtext.ScrolledText(self.right_frame, height=15)
        self.log_text.pack(fill=tk.BOTH, expand=True)

        # 3.5 命令行输入框
        self.cmd_var = tk.StringVar()
        self.cmd_entry = ttk.Entry(self.right_frame, textvariable=self.cmd_var)
        self.cmd_entry.pack(fill=tk.X, pady=5)
        self.cmd_entry.bind("<Return>", self.run_command)  # 回车执行命令

    def log(self, msg):
        """添加日志"""
        self.log_text.insert(tk.END, f"[{time.strftime('%H:%M:%S')}] {msg}\n")
        self.log_text.see(tk.END)

    def refresh_tree(self):
        """刷新目录树"""
        for item in self.dir_tree.get_children():
            self.dir_tree.delete(item)
        self.dir_tree.insert("", "0", "root", text="/")
        self._add_tree_node("root", self.fs.cwd)

    def _add_tree_node(self, parent_item, inode_id):
        """递归添加目录节点"""
        try:
            items = self.fs.ls()
            for name, iid in items:
                if self.fs.inodes[iid].type == 'dir':
                    node = self.dir_tree.insert(parent_item, tk.END, text=name)
                    self._add_tree_node(node, iid)
                else:
                    self.dir_tree.insert(parent_item, tk.END, text=name)
        except Exception as e:
            self.log(f"刷新目录树失败：{e}")

    def mkdir(self):
        """创建目录"""
        name = self.name_var.get().strip()
        if not name:
            messagebox.showwarning("警告", "请输入目录名")
            return
        try:
            self.fs.create(name, 'dir')
            self.log(f"成功创建目录：{name}")
            self.refresh_tree()
            self.name_var.set("")
        except Exception as e:
            self.log(f"创建目录失败：{e}")
            messagebox.showerror("错误", str(e))

    def touch(self):
        """创建文件"""
        name = self.name_var.get().strip()
        if not name:
            messagebox.showwarning("警告", "请输入文件名")
            return
        try:
            self.fs.create(name, 'file')
            self.log(f"成功创建文件：{name}")
            self.refresh_tree()
            self.name_var.set("")
        except Exception as e:
            self.log(f"创建文件失败：{e}")
            messagebox.showerror("错误", str(e))

    def rm(self):
        """删除文件/目录"""
        name = self.name_var.get().strip()
        if not name:
            messagebox.showwarning("警告", "请输入要删除的名称")
            return
        try:
            self.fs.delete(name)
            self.log(f"成功删除：{name}")
            self.refresh_tree()
            self.name_var.set("")
        except Exception as e:
            self.log(f"删除失败：{e}")
            messagebox.showerror("错误", str(e))

    def write_file(self):
        """写入文件"""
        name = self.name_var.get().strip()
        content = self.content_var.get().strip()
        if not name:
            messagebox.showwarning("警告", "请输入文件名")
            return
        try:
            # 查找文件i节点
            target_inode_id = None
            for n, iid in self.fs.ls():
                if n == name and self.fs.inodes[iid].type == 'file':
                    target_inode_id = iid
                    break
            if target_inode_id is None:
                raise Exception("文件不存在")
            self.fs.write_file(target_inode_id, content)
            self.log(f"成功写入文件：{name}")
            self.name_var.set("")
            self.content_var.set("")
        except Exception as e:
            self.log(f"写入文件失败：{e}")
            messagebox.showerror("错误", str(e))

    def read_file(self):
        """读取文件"""
        name = self.name_var.get().strip()
        if not name:
            messagebox.showwarning("警告", "请输入文件名")
            return
        try:
            target_inode_id = None
            for n, iid in self.fs.ls():
                if n == name and self.fs.inodes[iid].type == 'file':
                    target_inode_id = iid
                    break
            if target_inode_id is None:
                raise Exception("文件不存在")
            content = self.fs.read_file(target_inode_id)
            self.log(f"读取文件 {name} 内容：{content}")
            self.content_var.set(content)
        except Exception as e:
            self.log(f"读取文件失败：{e}")
            messagebox.showerror("错误", str(e))

    def run_command(self, event):
        """执行命令行命令"""
        cmd = self.cmd_var.get().strip().split()
        if not cmd:
            return
        try:
            if cmd[0] == "mkdir" and len(cmd) == 2:
                self.fs.create(cmd[1], 'dir')
                self.log(f"命令执行成功：mkdir {cmd[1]}")
            elif cmd[0] == "touch" and len(cmd) == 2:
                self.fs.create(cmd[1], 'file')
                self.log(f"命令执行成功：touch {cmd[1]}")
            elif cmd[0] == "rm" and len(cmd) == 2:
                self.fs.delete(cmd[1])
                self.log(f"命令执行成功：rm {cmd[1]}")
            else:
                self.log("不支持的命令，支持：mkdir/rm/touch")
            self.refresh_tree()
            self.cmd_var.set("")
        except Exception as e:
            self.log(f"命令执行失败：{e}")

if __name__ == "__main__":
    root = tk.Tk()
    app = FileSystemGUI(root)
    root.mainloop()
