using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestTask.DTOs;
using TestTask.Entities;

namespace TestTask.Services
{
    public interface IPointService
    {
        Task<List<EPoint>> FindAll();
        Task<EPoint> FindById(int id);
        Task<Boolean> Delete(int id);
        Task<EPoint> Create(EPoint point);

        //Task<EPoint> Update(EPoint point);
    }
}
