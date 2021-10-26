import React from 'react';
import './styles/BadgesList.css';
import { Link } from 'react-router-dom';
import Gravatar from '../components/Gravatar';

function useSearchBadges(badges) {
    const [ query, setQuery ] = React.useState('');

    const [ filteredBadges, setFilteredBadges ] = React.useState(badges);

    React.useMemo(() => {
        const result = badges.filter(badge => {
            return `${badge.firstName}${badge.lastName}`.toLowerCase().includes(query.toLocaleLowerCase());
        })
        setFilteredBadges(result)
    }, [ badges, query]);


    return { query, setQuery, filteredBadges}
}

function BadgesList(props) {
    const badges = props.badges; 
    
    const { query, setQuery, filteredBadges } = useSearchBadges(badges)

    if(filteredBadges.length === 0) {
        return (
            <div>
                <div className="form-group mb-3">
                    <label>Filter Badges</label>
                    <input type="text" className="form-control" value={query} onChange={(e) => setQuery(e.target.value)}/>
                </div>
                <div> 
                    <h3>No badges were found</h3>
                    <Link className="btn btn-primary" to="/badges/new">Create New Badge</Link>
                </div>
            </div>
        )
    }
    return (
        <div className="BadgesList">
            <div className="form-group mb-3">
                <label>Filter Badges</label>
                <input type="text" className="form-control" value={query} onChange={(e) => setQuery(e.target.value)}/>
            </div>

            <ul className="list-unstyled">
                {filteredBadges.map((badge) => {return (
                    <li className="list-group-item item-list" key={badge.id}>
                        <Link className="text-reset text-decoration-none" to={`/badges/${badge.id}`}>
                            <div className="row">
                                <div className="col-2">
                                    <Gravatar className="avatar-list" email={badge.email} alt="Avatar"/>
                                </div>
                                <div className="col-10">
                                    <h6>{badge.firstName + " " +  badge.lastName}</h6>
                                    <span >@{badge.twitter}</span>
                                    <p>{badge.jobTitle}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    )
                }).reverse()}
            </ul>
        </div>
    );
}

export default BadgesList;