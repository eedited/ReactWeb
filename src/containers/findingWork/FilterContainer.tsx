import React, { useState } from 'react';
import FilterElement from '../../components/findingJobs/FilterElement/FilterElement';
import './FilterContainer.scss';

const FilterContainer: React.FC = () => (
    <div className="filter">
        <FilterElement name="키워드" searchbox="키워드" />
        <FilterElement name="채용방식" checkboxes={['파트타임', '풀타임']} />
        <FilterElement name="지역" checkboxes={['원격근무', '현장근무']} searchbox="지역선택" />
        <FilterElement name="업무 카테고리" checkboxes={['브이로그', '게임', '음악', 'IT', '스터디', '기타']} />
        <FilterElement name="정렬" selectbox={['최신순', '인기순']} />
    </div>
);

export default FilterContainer;
