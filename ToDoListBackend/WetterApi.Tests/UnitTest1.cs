using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WetterApi.Controllers;
using WetterApi.Models;
using Xunit;

namespace WetterApi.Tests
{
    public class ToDoItemsControllerTests
    {
        private ToDoItemsController _sut;
        private ToDoItemContext _context;

        public ToDoItemsControllerTests()
        {
            var options = new DbContextOptionsBuilder<ToDoItemContext>().UseSqlite("DataSource=:memory:")
                .Options;
            _context = new ToDoItemContext(options);
            _context.Database.OpenConnection();
            _context.Database.EnsureCreated();
            _sut = new ToDoItemsController(_context);
        }

        public class GetToDoItems : ToDoItemsControllerTests
        {
            [Fact]
            public async Task With_Empty_Database_Returns_Empty_ToDoList()
            {
                // act
                var result = await _sut.GetToDoItems();

                // arrange
                Assert.Empty(result.Value);
            }

            [Fact]
            public async Task With_Saved_ToDoItem_ToDoitem_in_List()
            {
                // arrange
                _context.ToDoItems.Add(new ToDoItem());
                _context.SaveChanges();

                // act
                var result = await _sut.GetToDoItems();

                // arrange
                Assert.Equal(1, result.Value.Count());
            }
        }

        public class GetDoItem : ToDoItemsControllerTests
        {
            [Fact]
            public async Task When_ToDoItem_DoesNotExist_Returns_NotFound()
            {
                await Assert.ThrowsAsync<NotFoundException>(() => _sut.GetToDoItem(0));
            }

            [Fact]
            public async Task When_ToDoItem_Exists_Returns_ToDoItem()
            {
                // arrange
                //_context.ToDoItems.Add(new ToDoItem());
                //_context.SaveChanges();
                await _sut.PostToDoItem(new ToDoItem());

                var result = await _sut.GetToDoItem(1);

                Assert.Equal(1, result.Id);

            }

            [Fact]
            public async Task When_ToDoItem_Deleted_Returns_NotFound()
            {
                //arrange 
                ToDoItem toDoItem = new ToDoItem();
                _context.ToDoItems.Add(toDoItem);
                _context.SaveChanges();
                await _sut.DeleteToDoItem(toDoItem.Id);
                
                var result = await _sut.GetToDoItems();
                Assert.Equal(0, result.Value.Count());
            }


            [Fact]
            public async Task When_ToDoItem_IsUnchanged_Returns_Unchanged()
            {
                //arrange
                ToDoItem toDoItem = new ToDoItem
                    {Id = 0, Details = "test", Name = "test", Timestamp = "12/12/12", Status = true};

                _context.ToDoItems.Add(toDoItem);
                _context.SaveChanges();
                await _sut.PutToDoItem(0, toDoItem);
                
                //act
                var result = _context.Entry(toDoItem).State.ToString();
                
                //assert
                Assert.Equal("Unchanged", result);
            }

            [Fact]
            public async Task When_ToDoItem_IsChanged_Returns_Modified()
            {
                //arrange
                ToDoItem changedItem = new ToDoItem
                    {Id = 0, Details = "testChange", Name = "NameChanged", Timestamp = "13/12/12", Status = false};

                    _context.ToDoItems.Add(new ToDoItem{Id = 0, Details = "test", Name = "test", Timestamp = "12/12/12", Status = true});
                _context.SaveChanges();
                await _sut.PutToDoItem(0, changedItem);
               
                //act
                var result = _context.Entry(changedItem).State.ToString();
                //assert
                Assert.Equal("Modified", result);
            }
            
            
            
            
        }
    }
}