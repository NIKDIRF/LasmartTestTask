using Microsoft.EntityFrameworkCore;
using System;
using TestTask.DTOs;
using TestTask.Entities;

namespace TestTask.DB
{
    public class PointDBContext : DbContext
    {
        public PointDBContext(DbContextOptions<PointDBContext> options) : base(options)
        {
        }
        public DbSet<EPoint> EPoints { get; set; }
        public DbSet<EComment> EComments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            EPoint[] dots =
            {
                new() { Id = 1, Color = "#D3D3D3", X = 100, Y = 100, Radius = 15 },
                new() { Id = 2, Color = "red", X = 400, Y = 150, Radius = 30 },
            };
            EComment[] comments =
            {
                new() { Id = 1, PointId = 1, BackgroundColor = "#FFFDFC", Text = "comment 1" },
                new() { Id = 2, PointId = 1, BackgroundColor = "yellow", Text = "comment 2" },
                new() { Id = 3, PointId = 2, BackgroundColor = "#FFFDFC", Text = "comment 3" },
                new() { Id = 4, PointId = 2, BackgroundColor = "#D1D4D2", Text = "comment 4" },
                new() { Id = 5, PointId = 2, BackgroundColor = "#FFFDFC", Text = "comment 5" },
                new() { Id = 6, PointId = 2, BackgroundColor = "#FEFF00", Text = "comment 6 looooooooooooong comment" },
                new() { Id = 7, PointId = 2, BackgroundColor = "#D1D4D2", Text = "comment 7" },
                new() { Id = 8, PointId = 2, BackgroundColor = "#FFFDFC", Text = "comment 8" },
            };

            modelBuilder.Entity<EPoint>().HasData(dots);
            modelBuilder.Entity<EComment>().HasData(comments);
        }
    }
}
