using Microsoft.EntityFrameworkCore;

namespace WetterApi.Models
{
    public class ToDoItemContext : DbContext
    {
        public ToDoItemContext(DbContextOptions<ToDoItemContext> options) : base(options)
        {
            
        }
        public DbSet<ToDoItem> ToDoItems { get; set; }
    }
}