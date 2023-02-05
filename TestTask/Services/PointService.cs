using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestTask.DB;
using TestTask.DTOs;
using TestTask.Entities;

namespace TestTask.Services
{
    public class PointService : IPointService
    {
        private readonly PointDBContext _context;

        public PointService(PointDBContext dbContext)
        {
            _context = dbContext;
        }

        public async Task<EPoint> Create(EPoint ePoint)
        {
            var r = await _context.EPoints.AddAsync(ePoint);
            await _context.SaveChangesAsync();
            return ePoint;
        }

        public async Task<EPoint> FindById(int id)
        {
            return await _context.EPoints.Include(tmp => tmp.Comments).FirstOrDefaultAsync(eptoint => eptoint.Id == id);
        }

        public async Task<bool> Delete(int id)
        {
            bool removed = true;
            try
            {
                var epoint = await FindById(id);
                _context.EPoints.Remove(epoint);
                await _context.SaveChangesAsync();
            } catch (Exception ex)
            {
                removed = false;
            }

            return removed;
        }


        public async Task<List<EPoint>> FindAll()
        {
            return await _context.EPoints.Include(point => point.Comments).ToListAsync();
        }

    }
}
